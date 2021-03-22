<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{infoForm.id ? '编辑广告' : '添加广告'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box">
                <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                    <el-form-item label="广告名称" prop="name">
                        <el-input v-model="infoForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="广告简介" prop="content">
                        <el-input type="textarea" v-model="infoForm.content" :rows="3"></el-input>
                        <div class="form-tip"></div>
                    </el-form-item>
                    <el-form-item label="广告链接" prop="link">
                        <el-input v-model="infoForm.link"></el-input>
                    </el-form-item>
                    <el-form-item label="广告图片" prop="image_url">
                        <el-upload class="image-uploader" name="ad_pic"
                                   action="http://127.0.0.1:8360/admin/upload/adPic" :show-file-list="false"
                                   :on-success="handleUploadImageSuccess" :headers="uploaderHeader">
                            <img v-if="infoForm.image_url" :src="infoForm.image_url" class="image-show">
                            <i v-else class="el-icon-plus image-uploader-icon"></i>
                        </el-upload>
                        <div class="form-tip">图片尺寸：750*420</div>
                    </el-form-item>
                    <el-form-item label="启用">
                        <el-switch v-model="infoForm.enabled"></el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitInfo">确定保存</el-button>
                        <el-button @click="goBackPage">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/config/api';
    export default {
        data() {
            return {
                uploaderHeader: {
                    'X-Nideshop-Token': localStorage.getItem('token') || '',
                },
                infoForm: {
                    id: 0,
                    ad_position_id:1,
                    media_type:1,
                    name: "",
                    link:"",
                    image_url: '',
                    content: '',
                    end_time:0,
                    enabled:1,
                },
                infoRules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                    ],
                    content: [
                        { required: true, message: '请输入简介', trigger: 'blur' },
                    ],
                    image_url: [
                        { required: true, message: '请选择品牌图片', trigger: 'blur' },
                    ],
                },
            }
        },
        methods: {
            goBackPage() {
                this.$router.go(-1);
            },
            onSubmitInfo() {
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        this.axios.post('advert/store', this.infoForm).then((response) => {
                            if (response.data.errno === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功'
                                });
                                this.$router.go(-1)
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '保存失败'
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            handleUploadImageSuccess(res, file) {
                if (res.errno === 0) {
                    // switch (res.data.name) {
                    //     //品牌图片
                    //     case 'brand_pic':
                    //         this.$set('infoForm.list_pic_url', res.data.fileUrl);
                    //         break;
                    //     case 'brand_new_pic':
                    //         this.$set('infoForm.new_pic_url', res.data.fileUrl);
                    //         break;
                    // }
                    if(res.data.name=="ad_pic"){
                        // infoForm.list_pic_url = res.data.fileUrl;
                        this.infoForm.image_url = res.data.fileUrl;
                        // this.$set('this.infoForm.list_pic_url', res.data.fileUrl);
                    }
                }
            },
            getInfo() {
                if (this.infoForm.id <= 0) {
                    return false
                }

                //加载品牌详情
                let that = this
                this.axios.get('advert/info', {
                    params: {
                        id: that.infoForm.id
                    }
                }).then((response) => {
                    let resInfo = response.data.data;
                    resInfo.is_new = resInfo.is_new ? true : false;
                    resInfo.is_show = resInfo.is_show ? true : false;
                    that.infoForm = resInfo;
                })
            }

        },
        components: {},
        mounted() {
            this.infoForm.id = this.$route.query.id || 0;
            this.getInfo();
            console.log(api)
        }
    }

</script>

<style>
    .image-uploader{
        height: 105px;
    }
    .image-uploader .el-upload {
        border: 1px solid #d9d9d9;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .image-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .image-uploader .image-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 187px;
        height: 105px;
        line-height: 105px;
        text-align: center;
    }

    .image-uploader .image-show {
        width: 187px;
        height: 105px;
        display: block;
    }

    .image-uploader.new-image-uploader {
        font-size: 28px;
        color: #8c939d;
        width: 165px;
        height: 105px;
        line-height: 105px;
        text-align: center;
    }

    .image-uploader.new-image-uploader .image-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 165px;
        height: 105px;
        line-height: 105px;
        text-align: center;
    }

    .image-uploader.new-image-uploader .image-show {
        width: 165px;
        height: 105px;
        display: block;
    }
</style>

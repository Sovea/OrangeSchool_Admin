<template>
	<div class="content-page">
		<div class="content-nav">
			<el-breadcrumb class="breadcrumb" separator="/">
				<el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>论坛管理</el-breadcrumb-item>
				<el-breadcrumb-item>文章列表</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="operation-nav">
				<router-link to="/dashboard/article/read">
					<el-button type="primary" icon="plus">查看文章</el-button>
				</router-link>
			</div>
		</div>
		<div class="content-main">
			<div class="filter-box">
				<el-form :inline="true" :model="filterForm" class="demo-form-inline">
					<el-form-item label="文章名称">
						<el-input v-model="filterForm.name" placeholder="文章名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmitFilter">查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="form-table-box">
				<el-table :data="tableData" style="width: 100%" border stripe>
					<el-table-column prop="article_id" label="ID" width="100">
					</el-table-column>
					<el-table-column prop="article_header" label="文章名称">
					</el-table-column>
                    <el-table-column prop="username" label="作者">
					</el-table-column>
					<el-table-column prop="article_post_time" label="发布时间">
					</el-table-column>
					<el-table-column prop="on_top" label="是否置顶" width="100">
						<template scope="scope">
							{{ scope.row.on_top == 1 ? '是' : '否'}}
						</template>
					</el-table-column>
					<el-table-column label="操作" width="250">
						<template scope="scope">
							<el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">查看</el-button>
							<el-button size="small" @click="handleSetTop(scope.$index, scope.row)">置顶</el-button>
							<el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
												
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="page-box">
				<el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			page: 1,
			total: 0,
			filterForm: {
				name: ''
			},
			tableData: []
		}
	},
	methods: {
		handlePageChange(val) {
			this.page = val;
			//保存到localStorage
			localStorage.setItem('advertPage', this.page)
			localStorage.setItem('advertFilterForm', JSON.stringify(this.filterForm));
			this.getList()
		},
		handleRowEdit(index, row) {
			this.$router.push({ name: 'article_read', query: { id: row.article_id } })
		},
		handleSetTop(index, row){
			this.$confirm('确定要将该文章置顶?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {

				this.axios.post('article/ArticleSetTop', { article_id: row.article_id }).then((response) => {
					console.log(response.data)
					if (response.data.errno === 0) {
						this.$message({
							type: 'success',
							message: '置顶成功!'
						});

						this.getList();
					}
				})


			});
		},
		handleRowDelete(index, row) {
			this.$confirm('确定要删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {

				this.axios.post('article/ArticleDelete', { article_id: row.article_id }).then((response) => {
					console.log(response.data)
					if (response.data.errno === 0) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});

						this.getList();
					}
				})


			});
		},
		onSubmitFilter() {
			this.page = 1
			this.getList()
		},
		getList() {
			this.axios.get('article/ArticleList', {
				params: {
					page: this.page,
					name: this.filterForm.name
				}
			}).then((response) => {
                this.tableData = response.data.data.data
                this.page = response.data.data.currentPage
                this.total = response.data.data.count
			})
		}
	},
	components: {

	},
	mounted() {
		this.getList();
	}
}

</script>

<style scoped>

</style>

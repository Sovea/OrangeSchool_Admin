import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: require('@/components/DashboardPage'),
            children: [
                {
                    path: '/',
                    name: 'welcome',
                    component: require('@/components/WelcomePage')
                },
                {
                    path: 'goods',
                    name: 'goods',
                    component: require('@/components/Goods/GoodsPage')
                },
                {
                    path: 'goods/add',
                    name: 'goods_add',
                    component: require('@/components/Goods/GoodsAddPage')
                },
                {
                    path: 'usergoods',
                    name: 'usergoods',
                    component: require('@/components/Goods/UserGoodsPage')
                },
                {
                    path: 'usergoods/add',
                    name: 'usergoods_add',
                    component: require('@/components/Goods/UserGoodsAddPage')
                },
                {
                    path: 'category',
                    name: 'category',
                    component: require('@/components/Category/CategoryPage')
                },
                {
                    path: 'category/add',
                    name: 'category_add',
                    component: require('@/components/Category/CategoryAddPage')
                },
                {
                    path: 'brand',
                    name: 'brand',
                    component: require('@/components/Brand/BrandPage')
                },
                {
                    path: 'brand/add',
                    name: 'brand_add',
                    component: require('@/components/Brand/BrandAddPage')
                },
                {
                    path: 'advert',
                    name: 'advert',
                    component: require('@/components/Advert/AdvertPage')
                },
                {
                    path: 'advert/add',
                    name: 'advert_add',
                    component: require('@/components/Advert/AdvertAddPage')
                },
                {
                    path: 'article',
                    name: 'article',
                    component: require('@/components/Article/ArticlePage')
                },
                {
                    path: 'article/read',
                    name: 'article_read',
                    component: require('@/components/Article/ArticleReadPage')
                },
                {
                    path: 'article_advert',
                    name: 'article_advert',
                    component: require('@/components/Article/AdvertPage')
                },
                {
                    path: 'article_advert/add',
                    name: 'article_advert_add',
                    component: require('@/components/Article/AdvertAddPage')
                },
                {
                    path: 'order',
                    name: 'order',
                    component: require('@/components/Order/OrderPage')
                },
                {
                    path: 'order/detail',
                    name: 'order_detail',
                    component: require('@/components/Order/OrderDetailPage')
                },
                {
                    path: 'operate/topic',
                    name: 'topic',
                    component: require('@/components/Topic/TopicPage')
                },
              {
                path: 'operate/topic/add',
                name: 'topic_add',
                component: require('@/components/Topic/TopicAddPage')
              },
              {
                path: 'user',
                name: 'user',
                component: require('@/components/User/UserPage')
              },
              {
                path: 'user/add',
                name: 'user_add',
                component: require('@/components/User/UserAddPage')
              },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: require('@/components/LoginPage')
        },
        {
            path: '*',
            redirect: '/dashboard'
        }
    ]
})

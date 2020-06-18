import Vue from "vue"
import Router from "vue-router"
import Home from "@/views/Home"
import Login from "@/views/Login"
import Register from "@/views/Register"
import CreateOffer from "@/components/offers/CreateOffer"
import ChatPanel from "@/views/ChatPanel"
import Chat from "@/components/chat/Chat"
import Item from "@/components/offers/Item"
import UpdateOffer from "@/components/offers/UpdateOffer"
import OfferList from "@/components/offers/OfferList"
import MyOffers from "@/views/MyOffers"
import UserPanel from "@/views/UserPanel"
Vue.use(Router);

export default new Router({
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/createOffer',
        name: 'createOffer',
        component: CreateOffer
      },
      {
        path: '/updateOffer/:id',
        name: 'updateOffer',
        component: UpdateOffer
      },
      {
        path: '/offerList',
        name: 'offerList',
        component: OfferList,
        props(route) {
          return  route.query || {}
        }
      },
      {
        path: '/myOffers',
        name: 'myOffers',
        component: MyOffers,
        props(route) {
          return  route.query || {}
        }
      },
      {
        path: '/userPanel',
        name: 'userPanel',
        component: UserPanel,
        props(route) {
          return  route.query || {}
        }
      },
      {
        path: '/chatPanel',
        name: 'chatPanel',
        component: ChatPanel,
        props: true
      },
      {
        path: '/chat/:id',
        component: Chat
      },
      {
        path: "/item",
        name: 'item',
        component: Item
      }
    ]
  });
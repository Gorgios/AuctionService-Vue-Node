import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

Vue.config.productionTip = false;
const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        limit: 3,
        userLimit: 8,
        isLoggedIn: null,
        username: "",
        error: null,
        bidPopUp: null,
        durationOptions: [
            {value: 60, text: "Minute"},
            {value: 60 * 60, text: "Hour"},
            {value: 60 * 60 * 24, text: "Day"},
            {value: 60 * 60 * 24 * 7, text: "Week"}
        ],
        auctionOptions: [
            {value: "buy_now", text: "Buy now"},
            {value: "auction", text: "Auction"}
        ]
    },
    mutations: {
        updateUser(state,user){
            if (user){
                state.username = user.username;
                state.isLoggedIn = true;
            }
            else{
                state.username = null;
                state.isLoggedIn = false;
            }
        },
        setError(state,error){
            state.error = error;
        },
        setPopUp(state,title){
            state.bidPopUp = title;
        }
    }
});

export default store;
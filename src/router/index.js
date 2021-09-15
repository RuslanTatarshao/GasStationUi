import { createRouter, createWebHistory } from 'vue-router'
import Stations from "../views/Stations";
import Fuels from "../views/Fuels";
import Users from "../views/Users";
import Registration from "../views/Registration";
import Login from "../views/Login";
import StationEdit from "../views/StationEdit";
import FuelEdit from "../views/FuelEdit";
import StationDetail from "../views/StationDetail";



const routes = [
    {
        path: '/stations',
        name: 'stations',
        component: Stations,
    },
    {
        path: '/stations/detail/:stationId',
        name: 'stationDetail',
        component: StationDetail,
        props: true
    },
    {
        path: '/stations/:stationId',
        name: 'stationEdit',
        component: StationEdit,
        props: true,
    },
    {
        path: '/stations/create',
        name: 'stationCreate',
        component: StationEdit,
        props: true,
    },
    {
        path: '/fuels',
        name: 'fuels',
        component: Fuels,
    },
    {
        path: '/fuels/:fuelId',
        name: 'fuelEdit',
        component: FuelEdit,
        props: true,

    },
    {
        path: '/fuels/create',
        name: 'fuelCreate',
        component: FuelEdit,
        props: true,
    },
    {
        path: '/users',
        name: 'users',
        component: Users,
        props: true,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

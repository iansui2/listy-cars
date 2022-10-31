import httpname from "./axios/http-car";

class CarApi {
    getAllCars() {
        return httpname.get('/getCars');
    }

    getCar(id) {
        return httpname.get(`/getCar/${id}`);
    }

    listCar(data) {
        return httpname.post('/listCar', data);
    }

    updateCar(id, data) {
        return httpname.put(`/updateCar/${id}`, data);
    }

    deleteCar(id) {
        return httpname.delete(`/deleteCar/${id}`);
    }
}    

export default new CarApi();

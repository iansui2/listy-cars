import httpname from "./axios/http-car";

class CarApi {
    getAllCars() {
        return httpname.get('/getCars');
    }

    getCar(id) {
        return httpname.get(`/getCar/${id}`);
    }
}    

export default new CarApi();

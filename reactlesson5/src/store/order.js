import { makeAutoObservable } from "mobx";

export class Order {
    constructor(rootStore){
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
    
    data = [
        { name: 'email', label: 'Email', value: '', valid: false, pattern: /^.+@.+$/ },
		{ name: 'phone', label: 'Phone', value: '', valid: false, pattern: /^\d{5,12}.+$/ },
		{ name: 'name', label: 'Name', value: '', valid: false, pattern: /^.{2,}$/ }
    ]

    get getData () {
        let dataObj = {};

        this.data.forEach(field => {
            dataObj[field.name] = field.value;
        });
        return dataObj;
    };
 
	update = (name, value) => {
        this.data.forEach((field) => {
            if (field.name === name) {
                field.value = value;
                field.valid = field.pattern.test(value);
            }
        })
		// this.data.map(field => {
		// 	if(field.name != name){
		// 		return field;
		// 	}

        //     console.log( name );
		// 	let valid = field.pattern.test(value);
		// 	return { ...field, value, valid };
		// });
	}
}

export default new Order;
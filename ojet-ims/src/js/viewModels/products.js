
define(["knockout", "ojs/ojbootstrap", "ojs/ojknockout", "oj-c/button",  "ojs/ojbutton", "ojs/ojdialog", 'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojformlayout'],
 function(ko) {
    function ProductsViewModel() {
        this.name = ko.observable(null);
        this.company = ko.observable(null);
        this.barcode = ko.observable(null);
        this.stock = ko.observable(null);

        this.addnew = (_) => {

            console.log(this.name());
            console.log(this.company());
            console.log(this.barcode());
            console.log(this.stock());
            if(this.name() != "" && this.company() != "" && this.barcode() != "" && this.stock() != "") {
                 fetch('http://localhost:8080/addproduct', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: this.name(), company: this.company(), barcode: this.barcode(), stock: this.stock()})})
                    .then(res => res.json())
                    .then(data => console.log(data))
                    .catch(err => console.log(err)) 
            }
            else {
                alert("all fields are mandatory");
            }
            // fetch('http://localhost:8080/login', {
            //   method: 'POST',
            //   headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify({email: this.email(), pass: this.pass()})})
            //   .then(res => res.json())
            //   .then(data => console.log(data))
            //   .catch(err => console.log(err))
        }


        this.close = (_) => {
            document.getElementById("modalDialog1").close();
        }
        this.open = (_) => {
            document.getElementById("modalDialog1").open();
        }
    }
    return ProductsViewModel;
  }
);

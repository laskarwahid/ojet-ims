
define(["knockout", 
        "ojs/ojarraydataprovider",
        "ojs/ojbootstrap", 
        "ojs/ojknockout", 
        "oj-c/button",  
        "ojs/ojbutton", 
        "ojs/ojdialog", 
        'ojs/ojinputtext', 
        'ojs/ojinputnumber', 
        'ojs/ojformlayout', 
        "ojs/ojtable"],
 function(ko, ArrayDataProvider) {
    function VendorsViewModel() {
        this.name = ko.observable(null);
        this.email = ko.observable(null);
        this.pass = ko.observable(null);
        this.address = ko.observable(null);
        this.vendors = ko.observableArray();

        this.addnew = (_) => {
            if(this.name() != "" && this.email() != "" && this.pass() != "" && this.address() != "") {
                 fetch('http://localhost:8080/addvendor', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: this.name(), email: this.email(), pass: this.pass(), address: this.address()})})
                    .then(res => {
                        console.log(res.json());
                    })
                    .then(data => console.log(data))
                    .catch(err => console.log(err)) 
            }
            else {
                alert("all fields are mandatory");
            }
        }


        this.getVendors = () => {
            $.ajax({
              type: "get",
              url: "http://localhost:8080/vendors",
              error: function (error) {
                console.log(error);
              }.bind(self),
              success: function (response) {
                console.log(response);

                // console.log(this.vendors.length);

                // for (const vendor of response.data) {
                //     this.vendors.push({
                //         vendor_id: vendor["vendor_id"], name: vendor["name"], email: vendor["email"], address: vendor["address"], pass: vendor["pass"]
                //     });
                // }


                this.vendors = response.data;
                console.log(this.vendors);
                console.log(this.vendors.length);
              }.bind(self),
            });
        };

        this.getVendors();

        this.dataprovider = new ArrayDataProvider(this.vendors, {
            keyAttributes: "vendor_id",
        });


        this.close = (_) => {
            document.getElementById("modalDialog1").close();
        }
        this.open = (_) => {
            document.getElementById("modalDialog1").open();
        }
    }
    return VendorsViewModel;
  }
);

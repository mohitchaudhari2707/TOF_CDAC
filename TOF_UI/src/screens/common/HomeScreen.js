import "../../App.css"
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer"; 
import logo from './banner.png';
import ApiCustomerService from "../../services/customer/ApiCustomerService";
import pic0 from "../../images/Fruits.jpg"
import pic1 from "../../images/cover1.jpg"
import pic2 from "../../images/cover2.jpg"
import pic3 from "../../images/cover3.jpg"
import pic4 from "../../images/cover4.jpg"
import pic5 from "../../images/vegetablebaket.jpg"
import pic6 from "../../images/herbs.jpg"
import pic7 from "../../images/cocnut.jpg"
import pic8 from "../../images/summer coolers.jpg"
import pic9 from "../../images/summer melon.jpg"
import pic10 from "../../images/summer veggies.jpg"
class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            category:[],
            products: [],
            message:"",
        }
        this.selectcategory = this.selectcategory.bind(this);
        this.reloadCategoryList = this.reloadCategoryList.bind(this);
        this.reloadProductsList = this.reloadProductsList.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
        this.productDetails = this.productDetails.bind(this);
    }

    componentDidMount() {
        let size = JSON.parse(window.localStorage.getItem("cart_size"))
        if(size === null)
            JSON.stringify(window.localStorage.setItem("cart_size", 0) );
        if(size !== null)
        JSON.stringify(window.localStorage.setItem("cart_size", size) );

        let uId = JSON.parse(window.localStorage.getItem("user_id"))
        if(uId === null)
            JSON.stringify(window.localStorage.setItem("user_id", 9999));
        if(uId !== null)
        JSON.stringify(window.localStorage.setItem("user_id", uId));
        
        this.reloadCategoryList();
        this.reloadProductsList();
    }

    reloadCategoryList() {
        ApiCustomerService.fetchAllCategory()
        .then((res) => {
            this.setState({category : res.data.result})
        });
    }

    reloadProductsList() {
        ApiCustomerService.fetchProductsForHomePage()
        .then((res) => {
            window.localStorage.setItem("msg", res.data.message)
            this.setState({products : res.data.result})
        });
    }


    selectcategory(id, name) {
        window.localStorage.setItem("category_id", id);
        window.localStorage.setItem("category_name", name);
        this.props.history.push('/product-category');
    }

    addProductToCart(product) {
        let productCartId = {userId: JSON.parse(window.localStorage.getItem("user_id")), 
            productId: product.id};
        ApiCustomerService.addProductToCart(productCartId)
        .then((res) => {
            this.setState({message: res.data.result})
        });
        alert("!!! Items Added to Cart !!!");
        JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) + 1) );      
        window.localStorage.setItem("addressStatus", false)
        this.props.history.push('/home');       
    }

    productDetails(product) {
        window.localStorage.setItem("product_id", product.id);
        this.props.history.push('/product-details');
    }
    


    render() {
        return (
            <div >
                
                <Navigation/>
                <br></br>
                <div>
                {/* <ImageBackground source={pic4} style={{width: '100%', height: '100%'}}>
   <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>     
   <Text>Centered text</Text>
   </View>
</ImageBackground> */}

{/* <View style={styles.imageWrapper}>
     <ImageBackground style={styles.theImage} source={{uri : item.imageUrl}}>
          <Text>Hey</Text>
     </ImageBackground>
</View> */}
</div>
{/* <div  class="container">
  <img src={pic4} alt="Notebook" style="width:1500px;"/>
  <div class="content">
    <h1>Heading</h1>
    <p>Lorem ipsum..</p>
  </div>
</div> */}
    <div>
                    <table>
                        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel" >
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 5"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 6"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 7"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 8"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 9"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 10"></button>
                                </div>
    
                               <div class="text-centre" className="carousel-inner" >
                                    <div  className="carousel-item active" data-bs-interval="2000">
                                    <Link to="/home">
                                    <img class="text-centre" src={pic5}  w   alt="image1" />
                                    </Link>
                                    </div>
                                    <div className="carousel-item" data-bs-interval="2000">
                                    <img class="text-centre" src={pic6}   alt="image2"/>
                                    </div>
                                    <div className="carousel-item" data-bs-interval="2000">
                                    <img class="text-centre" src={pic7}   alt="image3" />
                                    </div>
                                    <div className="carousel-item" data-bs-interval="2000">
                                    <img class="text-centre" src={pic8}   alt="image4" />
                                    </div>
                                    <div className="carousel-item" data-bs-interval="2000">
                                    <img class="text-centre" src={pic9}   alt="image4" />
                                    </div>
                                    <div className="carousel-item" data-bs-interval="2000">
                                    <img class="text-centre" src={pic10}  alt="image4" />
                                    </div>
                                    
                                    
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"  data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"  data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                                </div>
                    </table>               
                </div>
                <br></br>
                <hr  style={{
    color: '	#000000',
    
    backgroundColor: '#000000',
    height: 3,
    borderColor : '	#000000'
}}/>
                <div>
                <img src={pic4} width="100%" height="600px"></img>
                

                </div>
                
                <br></br>
                <div>
                    <table>
                        <div id="carouselExampleInterval1" class="carousel slide" data-bs-ride="carousel" >
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 0"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 4"></button>
                                </div>
    
                               <div className="carousel-inner" >
                                    <div className="carousel-item active" data-bs-interval="2000">
                                    <Link to="/home">
                                    <img src={pic1} width="1350px" height="500px"   alt="image1" />
                                    </Link>
                                    </div>
                                    <div className="carousel-item" data-bs-interval="2000">
                                    <img src={pic2} width="1350px" height="500px"  alt="image2"/>
                                    </div>
                                    <div className="carousel-item" data-bs-interval="2000">
                                    <img src={pic3} width="1350px" height="500px"  alt="image3" />
                                    </div>
                                    <div className="carousel-item" data-bs-interval="2000">
                                    <img src={pic0} width="1350px" height="500px"  alt="image4" />
                                    </div>
                                    
                                    
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval1"  data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval1"  data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                                </div>

                                



                    </table>               
                </div>
                <br>
                </br>
              
                
                
                <div className="container " style={{width: "90%"}}>
                        <div class="row">
                            <div className="col-md-5"><hr /></div>
                            <div className="col-md-2"><h4>Categories</h4></div>
                            <div className="col-md-5"><hr /></div>
                        </div>
                </div>
 

                <div className="container">
                    <div className="row row-center">
                    {this.state.category.map(cat => 
                        <div className="product col-md-3" key={cat.id}>
                            <div className="title"> 
                            <Link to="/product-category">
                            <a className="navbar-brand" name="fruitsnvegtables" onClick={() => { this.selectcategory(cat.id, cat.categoryName) }}>
                            <img src={'/images/'+cat.categoryName+'.jpg'} className="d-block w-100 " alt="image" height="200px" width="200px" />
                            </a>
                            </Link> 
                                
                                <a className="nav-link" onClick={() => { this.selectcategory(cat.id, cat.categoryName) }}><h5 className="nameColor">{cat.categoryName}</h5></a>                               
                            </div>
                        </div>
                        )}         
                    </div>
                </div>

                {/* <div className="container " style={{width: "90%"}}>
                        <div class="row">
                            <div className="col-md-5"><hr /></div>
                            <div className="col-md-2"><h4></h4></div>
                            <div className="col-md-5"><hr /></div>
                        </div>
                </div> */}

                <div className="container">
                    <div className="row row-center">
                    {this.state.products.map(product => 
                        <div className="product col-md-3" key={product.id}>
                            <div className="title"> 
                                <img src={'/images/'+product.productName+'.jpg'} className="d-block w-100 " alt="image" height="150px" width="50px" />
                                <a className="nav-link" onClick={() => { this.productDetails(product) }}><h5 className="nameColor">{product.productName}</h5></a>
                                <h5 className="nameColor">Rs. {product.finalPrice}</h5>
                                <h5 className="nameColor">Rs. <strike>{product.price}</strike><span className="nameColor1">&nbsp; {product.discount}% off</span></h5>                                
                                <h5 className="nameColor">{product.grams}gms</h5>
                            </div>
                            <button
                            onClick={() => {
                            this.addProductToCart(product)
                            }}
                            className="btn btn-sm btn-success btn-add-to-cart">
                            Add To Cart
                        </button>
                        </div>
                        )}         
                    </div>
                </div>
            </div>
        )
    }
   
  }


export default HomeScreen
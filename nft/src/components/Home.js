import React from "react";
import Add from "./Add";
import Web3 from "web3";
import "./App.css";
import NFT from "../abis/NFT.json";
import { Component } from "react";

class Home extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = NFT.networks[networkId];
    if (networkData) {
      const abi = NFT.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });
      const totalSupply = await contract.methods.totalSupply().call();
      this.setState({ totalSupply });


      for (var i = 1; i <= totalSupply; i++) {
        const name = await contract.methods.names(i - 1).call();
        const worth = await contract.methods.worths(i - 1).call();
        const path = await contract.methods.paths(i - 1).call();
        this.url(path)
        const description = await contract.methods.descriptions(i - 1).call();
        console.log(name, worth, path, description);
        this.setState({
          names: [...this.state.names, name],
          worths: [...this.state.worths, worth],
          descriptions: [...this.state.descriptions, description],
        });
      }
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  }

  url=(name)=>{
        fetch("http://localhost:5000/getImage/"+name)
        .then(response => response.blob())
        .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            this.setState({
                paths: [...this.state.paths, imageObjectURL],
            
            })
            
        });
  }

  mint = (_name, _path, _worth, _description) => {
    this.state.contract.methods
      .mint(_name, _path, _worth + "", _description)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState(
          {
            names: [...this.state.names, _name],
            worths: [...this.state.worths, _worth],
            paths: [...this.state.paths, _path],
            descriptions: [...this.state.descriptions, _description],
          },
          () =>
            console.log(
              "names",
              this.state.names,
              this.state.descriptions,
              this.state.paths,
              this.state.worths
            )
        );
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      totalSupply: 0,
      names: [],
      worths: [],
      paths: [],
      descriptions: [],
    };
  }

  submit = (values) => {
    console.log(values.file);
    this.mint(values.name, values.file, values.worth, values.description);
  };

  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbfar-dark ftco_navbar bg-dark ftco-navbar-light"
          id="ftco-navbar"
        >
          <div className="container">
            <div className="navbar-brand" href="index.html">
              Dany<span>NFT</span>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#ftco-nav"
              aria-controls="ftco-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="oi oi-menu"></span> Menu
            </button>
            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link">{this.state.account}</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div
          className="hero-wrap ftco-degree-bg"
          style={{ backgroundImage: "url('images/bg.jpeg')" }}
          data-stellar-background-ratio="0.5"
        >
          <div className="overlay"></div>
          <div className="container">
            <div className="row no-gutters slider-text justify-content-start align-items-center justify-content-center">
              <div className="col-lg-8">
                <div className="text w-100 text-center mb-md-5 pb-md-5">
                  <h1 className="mb-4">Create and Sell NFTs</h1>
                  <p style={{ fontSize: "20px" }}> NFT Marketplace</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section ftco-no-pt bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 heading-section text-center mb-5">
                <span className="subheading">What we offer</span>
                <h2 className="mb-2">Feeatured NFTs</h2>
              </div>
            </div>
            <div className="row">
              {this.state.names.map((i, index) => {
                return (
                  <div key={i+index} className="col-md-4">
                    <div className="carousel-car ">
                      <div className="item">
                        <div className="car-wrap rounded">
                          <div
                            className="img rounded d-flex align-items-end"
                            // style={{ backgroundImage: "url('images/bg.jpeg')" }}
                            style={{ backgroundImage: `url(${this.state.paths[index]})` }}


                          ></div>
                          <div className="text">
                            <h2 className="mb-0">{this.state.names[index]}</h2>
                            <div className="d-flex mb-3">
                              <p className="price ml-auto">
                                ${this.state.worths[index]}
                              </p>
                            </div>
                            <p className="d-flex mb-0 d-block">
                              {this.state.descriptions[index]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Add submit={this.submit} />
      </div>
    );
  }
}

export default Home;

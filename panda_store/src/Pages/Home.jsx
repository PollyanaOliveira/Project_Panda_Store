import React, { Component } from 'react';
import Categories from '../Components/Categories';
import ElementsHome from '../Components/ElementsHome';
import * as api from '../service/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      listCategories: [],
      products: [],
      query: '',
    };
  }

  componentDidMount() {
    this.categories();
  }

  categories = async () => {
    const data = await api.getCategories();
    this.setState({
      listCategories: data,
    });
  }

  getProducts = async ({ categoryId, query }) => {
    const displayProduct = await api.getProductBySearchBar(categoryId, query);
    return displayProduct;
  }

  handleClickCategory = async ({ target: { value } }) => {
    const { query } = this.state;
    const categoryId = value;
    const searchByCategories = await this.getProducts({ categoryId, query });
    this.setState({
      products: searchByCategories.results,
    });
  }

  render() {
    const { listCategories, products } = this.state;
    return (
      <div>
        <ElementsHome
          products={products}
        />
        <Categories
          categories={listCategories}
          handleClick={this.handleClickCategory}
        />
      </div>
    );
  }
}

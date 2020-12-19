import React, { Component } from 'react';
import './style.css';

export class IconsGrid extends Component {
  render() {
    return (
      <section className="features-icons text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="fa fa-desktop m-auto text-primary" />
                </div>
                <h3>Modern courses</h3>
                <p className="lead mb-0">From AWS, to Java</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="fa fa-layer-group  m-auto text-primary" />
                </div>
                <h3>All levels</h3>
                <p className="lead mb-0">From beginner to advanced!</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="far fa-check-circle m-auto text-primary" />
                </div>
                <h3>Easy to Use</h3>
                <p className="lead mb-0">
                  Easy to download resources and watch videos!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

import React from 'react'
import { Link } from 'gatsby'
import renderHTML from 'react-render-html';

// css imports


class HomePage extends React.Component {
  render() {
    const someHTML = `
    <style>
      @import url("https://fonts.googleapis.com/css?family=Open+Sans");
    </style>
    <header class="header_area">
        <nav class="navbar navbar-expand-lg menu_two">
            <div class="container">
                <h2 class="f_p f_700 f_size_40 l_height60" style="color: hotpink;">networq </h2>
                <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="menu_toggle">
                        <span class="hamburger">
                        </span>
                        <span class="hamburger-cross">
                            <span></span>
                            <span></span>
                        </span>
                    </span>
                </button>
            </div>
        </nav>
    </header>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-light">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
    <section class="slider_area">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 d-flex align-items-center">
                    <div class="slider_content" style="margin-top:32%">
                        <p style="font-family: Open sans; font-size:2.5em; font-weight: 700; color: white;">Leave your business <br><br>card at home</p><br>
                        <p style="font-size:1.3em;">Your face is your business card</p>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-default btn-round-md btn-md" data-toggle="modal" data-target="#exampleModal">
                            Start Here
                        </button>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="mobile_img img-fluid">
                        <div class="img"><img class="women_img leaf wow fadeInDown" data-wow-delay="0.4s" src="img/female-male-recognition.jpg" alt="People Working Together with Squares on their Faces"></div>
                    </div>
                </div>
            </div>
        </div>
        <img class="leaf l_left" src="img/home2/shape_02.png" alt="">
        <img class="leaf l_right" src="img/home2/shape_03.png" alt="">
        <img class="middle_shape" src="img/home2/shape_01.png" alt="">
        <img class="bottom_shoape" src="img/home2/shape.png" alt="">
    </section>

    <footer class="footer_area_two">
        <div class="footer_bottom">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <p class="mb-0 f_300">Copyright © 2018 by <a href="#">Make Squad</a></p>
                    </div>
                    <div class="col-sm-6">
                        <ul class="list-unstyled f_menu text-right">
                            <li><a href="#">Terms of Use</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    `
    return (
      <div>
        
        {renderHTML(someHTML)}
        <div>
          <Link to="/demo/">Go to Demo</Link>
        </div>
        <div>
          <Link to="/video/">Go to Video</Link>
        </div>
      </div>
    )
  }
}

export default HomePage

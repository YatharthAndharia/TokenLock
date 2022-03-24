import smartswap from "../smartswap.jpeg";
import "./Footer.css";
function Footer() {
  return (
    <>
      <div className="container-fluid">
        <div className="container footer">
          <hr className="mb-5" />

          <div className="row">
            <div className="col-lg-4 col-md-12 me-auto mb-3">
              <img
                src={smartswap}
                alt="brand-logo"
                className="brand-logo"
                style={{ height: "50px" }}
              />
            </div>

            <div className="col-lg-2 col-md-3 col ">
              <h5>Platform</h5>

              <a className="my-2 ">Explore</a>
              <br />

              <a className="my-2">All Coin</a>
              <br />

              <a className="my-2">About</a>
              <br />

              <a className="my-2">SmartSwap</a>
            </div>

            <div className="col-lg-2 col-md-3 col">
              <h5>Lockups</h5>

              <a className="my-2">Create Lock</a>
              <br />

              <a className="my-2">My Lockups</a>
              <br />

              <a className="my-2">Help Locking</a>
              <br />

              <a className="my-2">FAQ</a>
              <br />
            </div>

            <div className="col-lg-2 col-md-3 col footer-list">
              <h5>Company</h5>

              <a className="my-2">Privacy Poacy</a>
              <br />

              <a className="my-2">Terms & Condition</a>
              <br />

              <a className="my-2">GitBook</a>
              <br />

              <a className="my-2">Help Center</a>
              <br />
            </div>

            <div className="col-lg-2 col-md-3 col">
              <h5>Connect</h5>

              <a className="my-2">Facebook</a>
              <br />

              <a className="my-2">Discord</a>
              <br />

              <a className="my-2">Github</a>
              <br />

              <a className="my-2">Twitter</a>
              <br />
            </div>
          </div>

          <hr className="mt-5" />

          <span href="/">© 2022 SmartSwap All Rights Reserved.</span>
        </div>
      </div>
    </>
  );
}

export default Footer;

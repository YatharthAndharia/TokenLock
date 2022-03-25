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

            <div className="col-lg-2 col-md-3 col">
              <h5>Platform</h5>

              <li className="mb-1 ">Explore</li>
              <br />

              <li className="mb-1">All Coin</li>
              <br />

              <li className="mb-1">About</li>
              <br />

              <li className="mb-1">SmartSwap</li>
            </div>

            <div className="col-lg-2 col-md-3 col">
              <h5>Lockups</h5>

              <li className="mb-1">Create Lock</li>
              <br />

              <li className="mb-1">My Lockups</li>
              <br />

              <li className="mb-1">Help Locking</li>
              <br />

              <li className="mb-1">FAQ</li>
              <br />
            </div>

            <div className="col-lg-2 col-md-3 col footer-list">
              <h5>Company</h5>

              <li className="mb-1">Privacy Poacy</li>
              <br />

              <li className="mb-1">Terms & Condition</li>
              <br />

              <li className="mb-1">GitBook</li>
              <br />

              <li className="mb-1">Help Center</li>
              <br />
            </div>

            <div className="col-lg-2 col-md-3 col">
              <h5>Connect</h5>

              <li className="mb-1">Facebook</li>
              <br />

              <li className="mb-1">Discord</li>
              <br />

              <li className="mb-1">Github</li>
              <br />

              <li className="mb-1">Twitter</li>
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

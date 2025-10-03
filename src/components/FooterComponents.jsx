import { Typography } from "@mui/material";
import logo from "../assets/logo.png";

function FooterComponents() {
  return (
    <div
      className="d-flex align-items-center text-white pt-4 pb-4"
      style={{ minHeight: "15vh", backgroundColor: "#44444E" }}
    >
      <div className="d-none d-lg-block w-100">
        <div className="container ">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img
                src={logo}
                alt="logo"
                className="d-inline-block align-top me-2"
                height={70}
              />
            </div>
            <div>
              <div>
                <Typography variant="body2" fontWeight={700}>
                  Developed by RCCG NEW LIFE ASSEMBLY (Sunday School Department)
                </Typography>
              </div>

              <div>
                <Typography variant="caption">
                  All rights reserved &copy; {new Date().getFullYear()}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-sm-block d-lg-none w-100">
        <div className="container text-center">
          <div className="mb-4">
            <img
              src={logo}
              alt="logo"
              className="d-inline-block align-top me-2"
              height={40}
            />
          </div>
          <div>
            <div>
              <Typography variant="body2" fontWeight={700}>
                Developed by RCCG NEW LIFE ASSEMBLY (Sunday School Department)
              </Typography>
            </div>

            <div>
              <Typography variant="caption">
                All rights reserved &copy; {new Date().getFullYear()}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterComponents;

// import React from "react";
// import { Container, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import "./LandingPage.css";

// function LandingPage() {
//   const navigate = useNavigate();

//   return (
    
//     <div className="container-fluid landing-page">
//       <div className="back-video">
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           controls={false}
//           disablePictureInPicture
//           onContextMenu={(e) => e.preventDefault()}
//         >
//           <source src="blackhole.webm" type="video/webm" />
//           <source src="blackhole.mp4" type="video/mp4" /> {/* fallback for mobile Safari */}
//           Your browser does not support the video tag.
//         </video>
//       </div>
//       <div className="main-body">
//         <div className="sub-main">
//           <div className="sub1">
//             <div className='home-sub-div'>
//                 <h3 data-aos="zoom-in" data-aos-delay="2000">What's up! I'm</h3>
//                 <h1 className='name-head'>
//                     Shiwansh Solutions
//                 </h1>
//                 <h2 data-aos="flip-down" data-aos-delay="2200">Empowering Digital Growth</h2>
//                 <p data-aos="flip-up" data-aos-delay="2200">We are a leading SaaS company transforming businesses with innovative software and ready-to-use digital products. From AI-powered tools to scalable e-commerce platforms, we deliver smart, high-performance solutions that drive success in the digital era.</p>
//                 <div className="unbox" data-aos="flip-down" data-aos-delay="2200">
//                     <a href="https://api.whatsapp.com/send/?phone=919534098040&text&type=phone_number&app_absent=0" target="_blank">
//                         <img src="whatsapp2.png" alt="" />
//                     </a>
//                     <a href="https://www.instagram.com/shiwanshsolutions/" target="_blank">
//                         <img src="instagram2.png" alt="" />
//                     </a>
//                     <a href="https://in.linkedin.com/company/shiwansh-solutions" target="_blank">
//                         <img src="linkdin.svg" alt="" />
//                     </a>
//                 </div>
//                 <div className="btn btn-primary" style={{width:"110px", marginTop:"20px", background: "linear-gradient(to right, #1b74fa 0%, #03e5d7 100%)"}}  onClick={() => navigate("/login")}> <span>Get Start</span> </div>
//             </div>
//           </div>
//           <div className="sub2">
//             <img src="./mainIcons.svg" alt="" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;






import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  

  return (
    <div className="landing-page-wrapper">
      {/* Particles as background */}
      {/* < StarBackground /> */}

      <div className="landing-page">
        <div className="back-video">
          <video autoPlay loop muted playsInline>
            <source src="blackhole.webm" type="video/webm" />
            <source src="blackhole.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="main-body">
          <div className="sub-main">
            <div className="sub1">
              <div className="home-sub-div">
                <h3 data-aos="zoom-in" data-aos-delay="2000">What's up! I'm</h3>
                <h1 className="name-head">Shiwansh Solutions</h1>
                <h2 data-aos="flip-down" data-aos-delay="2200">Empowering Digital Growth</h2>
                <p data-aos="flip-up" data-aos-delay="2200">
                  We are a leading SaaS company transforming businesses with innovative software and ready-to-use digital products. From AI-powered tools to scalable e-commerce platforms, we deliver smart, high-performance solutions that drive success in the digital era.
                </p>

                <div className="unbox" data-aos="flip-down" data-aos-delay="2200">
                  <a href="https://api.whatsapp.com/send/?phone=919534098040&text&type=phone_number&app_absent=0" target="_blank">
                    <img src="whatsapp2.png" alt="WhatsApp" />
                  </a>
                  <a href="https://www.instagram.com/shiwanshsolutions/" target="_blank">
                    <img src="instagram2.png" alt="Instagram" />
                  </a>
                  <a href="https://in.linkedin.com/company/shiwansh-solutions" target="_blank">
                    <img src="linkdin.svg" alt="LinkedIn" />
                  </a>
                </div>

                <div
                  className="btn btn-primary"
                  style={{ width: "110px", marginTop: "20px", background: "linear-gradient(to right, #1b74fa 0%, #03e5d7 100%)" }}
                  onClick={() => navigate("/login")}
                >
                  <span>Get Start</span>
                </div>
              </div>
            </div>

            <div className="sub2">
              <img src="./mainIcons.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

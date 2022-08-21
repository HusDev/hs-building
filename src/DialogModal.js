import { motion } from "framer-motion";

// Data
const data = {
  spaceBar: {
    title: "Space Bar",
    description:
      "The space bar the calm place, you can enjoy the best cafe in barcelona. This space provides a place for students to socialize, work on projects together and grab a cup of coffee. the perfect balance between brain work and personal well-being",
    image: "https://i.imgur.com/FaCRII7.png",
  },
  kitchen: {
    title: "Kitchen",
    description:
      "You have the option to grab some lunch at one of the many cafes or restaurants close to uni. If you prefer staying on campus, you can also prepare your own mean here in our common kitchen. Store it also in the fridge or simply come down to enjoy a cup of coffee with your fellow students while discussing the newest ideas",
    image:
      "https://quadraturegroup.com/wp-content/uploads/quadrature-harbour-03.jpg",
  },
  oneRagTime: {
    title: "Oneragtime",
    description:
      "One of the amazing benefits of Harbour Space, is that we have Oneragtime, a venture capitalist company in same building. Hey! they might even invest in your startup",
    image:
      "https://media-exp1.licdn.com/dms/image/D4E1BAQEWAKhsnfFBsA/company-background_10000/0/1655471799941?e=2147483647&v=beta&t=DOPR7CAia9pEtC2OZr7NN_E3Nm1cZrrS3VieKsZ862Y",
  },
  openSpace: {
    title: "Open Space",
    description:
      "Here we are in our open space, this is the main area for students to socialize or continue working on the projects. Sometimes we even have yoga classes right here in the early morning or late evenings. And on top of them let's not forget the amazing sea view for a perfect learning environment.",
    image:
      "https://p1.nicelocal.es/preview/UVA1k0V5XqPkHUtWwqh-JA/640x425x85/1/2/8/original_61581ec7c1c5b971e52e785e_61583c7936887.jpg",
  },
  classes: {
    title: "Classes",
    description:
      "While most academia teaches a past we focus on creating the future our multifunctional classrooms are equipped with everything our students need to excel",
    image: "https://harbour.space/sites/default/files/blog/Cover_2_0.png",
  },
  theOffice: {
    title: "The Office",
    description:
      "Our meeting rooms are ideal for teamwork and high level deals, here you can witness amazing projects coming to life.",
    image: "https://i.imgur.com/Lwnw5ym.png",
  },
  default: {
    title: "Welcome to Harbour Space",
    description: "Click on any block for more info",
    image:
      "https://harbour.space/sites/default/files/blog/barcelona-startup-harbour-space_0.png",
  },
};

//   Styles
const styles = {
  zIndex: 1,
  position: "fixed",
  right: "10px",
  top: "50px",
  width: "300px",
  backgroundColor: "white",
  color: "black",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
};

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "8px 8px 0px 0px",
};

const closeButtonStyle = {
  backgroundColor: "white",
  borderRadius: "5px",
  height: "30px",
  padding: "5px",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  top: "-15px",
  left: "-15px",
};
const descriptionStyle = {
  color: "#333333",
  lineHeight: "110%",
  margin: "30px 10px",
};

// Components
function Back({ setBlock }) {
  return (
    <div style={closeButtonStyle} onClick={() => setBlock("default")}>
      <span>{"back"}</span>
    </div>
  );
}

export function DialogModal({ block, setBlock }) {
  const { title, description, image } = data[block];
  return (
    <>
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
        dragElastic={1}
        style={styles}
      >
        <Back setBlock={setBlock} />
        <img src={image} alt={title} style={imageStyle} />
        <h1>{title}</h1>
        <p style={descriptionStyle}>{description}</p>
      </motion.div>
    </>
  );
}

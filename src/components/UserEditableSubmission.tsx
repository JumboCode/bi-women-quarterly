import React from "react";



const UserEditableSubmission = () => {
  // React component state and logic would go here

  return (
    <div className="container ">
        <div className= "static ">
            <div className="title ms-40">
                Title of Piece
            </div>
        </div>

      <div className="medium ms-80">
        Medium
      </div>
      <div className="content ms-80">
        Lorem ipsum dolor sit amet consectetur. Pulvinar mus lectus congue adipiscing diam. Arcu lectus fringilla amet mauris fermentum tincidunt leo sed. Odio varius iaculis interdum ipsum sagittis enim amet integer. Diam tellus congue fermentum commodo at.
      </div>

      <div className="author ms-80">
        Author
      </div>

      <div className="photosContainer">
        <div className="photoBox"></div>
        <div className="photoBox"></div>
        {/* Additional photo boxes can be added here */}
      </div>

      <div className="navigation">
        <span className="nav-arrow">&#60;</span> {/* Left arrow */}
        <span className="nav-arrow">&#62;</span> {/* Right arrow */}
      </div>

      <div className="plus-icon">
        &#43; {/* Plus sign */}
      </div>
    </div>
  );
};

export default UserEditableSubmission;


// import React from 'react';
// // import './styles.css'; // Ensure this is uncommented and points to the correct path to include your styles

// const UserEditableSubmission = () => {
//   // Inline styles
//   const styles = {
//     container: {
//       fontFamily: 'Arial, sans-serif',
//       maxWidth: '800px', // Adjust as needed
//       margin: '80px',
//       padding: '20px'
//     },
//     title: {
//       fontSize: '24px',
// //       marginTop: '-60px',
// //       marginBottom: '10px'
//     },
//     medium: {
//       fontSize: '14px',
//       marginLeft: '500px',
//       color: '#666',
//       marginBottom: '5px'
//     },
//     content: {
//       fontSize: '14px',
//       marginLeft: '500px',
//       color: '#666',
//       marginBottom: '20px'
//     },
//     author: {
//       fontSize: '14px',
//       fontStyle: 'italic',
//       marginTop: '100px',
//       marginBottom: '20px',
//       marginLeft: '500px'
//     },
//     relatedPhotos: {
//       display: 'flex',
//       marginBottom: '20px'
//     },
//     // Container for both photo boxes, using flexbox to align them correctly
//     photosContainer: {
//         display: 'flex',
//         flexDirection: 'row', // Align children in a row
//         alignItems: 'flex-start', // Align children to the start of the cross axis
//       },
//       photoBox: {
//         width: '300px',
//         height: '300px',
//         backgroundColor: '#ccc',
//         // Removed marginRight and marginBottom, added margin to separate the boxes
//         margin: '20px', // Adjust as needed to provide space around the box
//       },
//       photoBox2: {
//         width: '100px',
//         height: '100px',
//         backgroundColor: '#ccc',
//         alignSelf: 'flex-end', // Align this item at the end of the cross axis // Position relative to allow moving it up
//         top: '-120px', // Adjust this value to move the second box up to overlap the first box
//         right: '250px' // Adjust this value to move the second box to the left
//       },
//     navigation: {
//       fontSize: '24px',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     },
//     plusIcon: {
//       fontSize: '24px',
//       cursor: 'pointer'
//     }
//   };

//  // return (
//     <div style={styles.container}>
//       <div style={styles.title}>
//         Title of Piece
//       </div>

//       <div style={styles.medium}>
//         Medium
//       </div>
//       <div style={styles.content}>
//         Lorem ipsum dolor sit amet consectetur. Pulvinar mus lectus congue adipiscing diam. Arcu lectus fringilla amet mauris fermentum tincidunt leo sed. Odio varius iaculis interdum ipsum sagittis enim amet integer. Diam tellus congue fermentum commodo at.
//       </div>

//       <div style={styles.author}>
//         Author
//       </div>

//       <div style={styles.relatedPhotos}>
//         <div style={styles.photoBox}></div>
//         <div style={styles.photoBox2}></div>
//       </div>

//       <div style={styles.navigation}>
//         <span>&#60;</span> {/* Left arrow */}
//         <span>&#62;</span> {/* Right arrow */}
//         <span style={styles.plusIcon}>&#43;</span> {/* Plus sign */}
//       </div>
//     </div>
//   );
// };

// export default UserEditableSubmission;
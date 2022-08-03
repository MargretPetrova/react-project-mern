// import styles from '../ErrorContainer/ErrorContainer.module.css'
// function ErrorContainer(){
// return (
//     <div>
//             <div className={styles.errorContainer}>
//                 <p>Error</p>
//             </div>
//         </div>
// )
// }
// export default ErrorContainer;
// import React from "react";
//  export class ErrorBoundary extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { error: null, errorInfo: null };
//     }

import { useState } from "react"

  
//     componentDidCatch(error, errorInfo) {
//       // Catch errors in any components below and re-render with error message
//       this.setState({
//         error: error,
//         errorInfo: errorInfo
//       })
//     }
  
//       render() {
//         if (this.state.errorInfo) {
//           // Error path
//           return (
//             <div>
//               <h2>Something went wrong.</h2>
//               {/* <details style={{ whiteSpace: 'pre-wrap' }}>
//                 {this.state.error && this.state.error.toString()}
//                 <br />
//                 {this.state.errorInfo.componentStack}
//               </details> */}
//             </div>
//           );
//         }
//         // Normally, just render children
//         return this.props.children;
//       }  
//   }
// export default function ErrorBoundary(){
//   const [errors, errorsState] = useState({error: null})
//   componentDidCatch(error){
//           // Catch errors in any components below and re-render with error message
//           errorsState({error: error,errorInfo: errorInfo})
//         }

//   return
// }
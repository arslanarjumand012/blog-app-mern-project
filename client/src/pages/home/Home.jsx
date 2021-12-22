import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
// eslint-disable-next-line
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchPosts = () => {
      fetch('post/',{
        method: 'GET',
      })
      .then(res => res.json())
      .then(data => {
        if(data.error){
          console.log(data, 'error');
        }
        else{
          setLoader(true)
          console.log(data, 'success');
          setTimeout(() => {
            setPosts(data.posts)
            setLoader(false)
          }, 3000)
        }
      })
      .catch(err => {
        console.log(err);
      })
    };
    fetchPosts();
  }, []);
  
  return (
    <>
      <Header />
      <div className="home">
        
              
        {loader &&  
        <div className='errorDiv1'>
            <div>
              <Loader
                type="Circles"
                color="#555"
                height={80}
                width={80}
                timeout={3000} //3 secs
              />
            </div>
          </div>
        }

            {posts ? 
              <> 
                {<Posts posts={posts} />}
              </>
              :
              <div className='errorDiv'></div>
            }

        <Sidebar />
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        />
      </div>
    </>
  );
}

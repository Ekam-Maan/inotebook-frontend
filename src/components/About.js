import React from 'react'


export default function About() {
   // const a = useContext(noteContext);
    //useEffect(()=>{a.update()},[])
  return (
    <div className='container my-5'>
      <h2>About Us</h2>
      <p>
        This is a cloud based notebook that can be accessed anytime and from anywhere.<br/>
        Your each and every note is kept secret and secure<br/>
        Not a single bit of information is shared with anyone<br/>
        This is a personal project created by Ekamjot Singh.<br/>
        Feel free contribute to project @ <a href="https://github.com/Ekam-Maan/inotebook-frontend" about='_blank'>Git Repo</a><br/>
        Go ahead --&gt; clone repo --&gt; create a pull request.<br/>
      </p>
    </div>
  )
}

import styles from "../styles/Home.module.css";

export default function Home() {
  // signup
  const formData = {
    name: "Leon",
    email: "yeitoriqul@gmail.com",
    password: "12345678910",
  };

  const signUp = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Setup Ready</h1>
      <button onClick={signUp}>Signup</button>
    </div>
  );
}

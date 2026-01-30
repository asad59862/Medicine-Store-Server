// signup.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

(async () => {
  const res = await fetch("http://localhost:5000/api/auth/sign-up/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": "http://localhost:3000"
    },
    body: JSON.stringify({
      name: "Md Abu Syeed Asad",
      email: "asad@example.com",
      password: "asad123456",
      phone: "01700000000"
    }),
    credentials: "include"
  });

  const data = await res.json();
  console.log(data);
})();

const sendCred= async (props)=>{
    fetch("http://127.0.0.1:3000/users",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "email":email,
       "password":password
     })
    })
    .then(res=>res.json())
    .then(async (data)=>{
           try {
             await AsyncStorage.setItem('token',data.token)
            //  props.navigation.replace("home")
           } catch (e) {
             console.log("error",e)
           }
    })
 }
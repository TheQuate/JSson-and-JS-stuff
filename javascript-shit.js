function Func() {
    fetch("./json-persobjekt.json")
        .then((res) => {
            return res.json();
        })
    .then((data) => console.log(data));
}
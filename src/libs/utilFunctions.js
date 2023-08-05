
//Questa funzione illumina o meno l'hexcolor inserito come primo parametro
//variando il secondo parametro.
function lightenHexColor(hexColor, amount) {
    // Rimuove l'hashtag (#) dal colore, se presente
    hexColor = hexColor.replace("#", "");
  
    // Divide il colore in componenti R, G e B
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
  
    // Applica l'aumento della luminosità a ciascun componente (R, G e B)
    const newR = Math.min(255, r + amount);
    const newG = Math.min(255, g + amount);
    const newB = Math.min(255, b + amount);
  
    // Converte i nuovi valori delle componenti in formato hex
    const newHexColor = "#" + (newR).toString(16).padStart(2, "0") +
                             (newG).toString(16).padStart(2, "0") +
                             (newB).toString(16).padStart(2, "0");
  
    return newHexColor;
  }

//Questa funzione permette di cambiare pagina e scrollare verso l'alto
function navigateFun(navigate, path, reload) {
  if(reload){
    window.location.href = path;
  }else{
    navigate(path);
    window.scrollTo(0,0);
  }
}

module.exports = {
  lightenHexColor,
  navigateFun
}
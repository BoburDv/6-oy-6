export async function getCountries(point){
  const req = await fetch(`https://restcountries.com/v3.1/${point}`);

  if (req.status === 200) {
    const res = await req.json();
    return res
  } 
  else {
    throw new Error("Ma'lumot topilmadi?");
  }
}

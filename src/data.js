const appdata = [
    {id:1,name:'tsegay',middlename:'welu',lastname:'gebre',result:[{eng:23,maths:40,biology:70,tigrigna:45,amharic:89,chemistry:67,physics:80,civic:59,geography:78}]},
    {id:2,name:'tsegay',middlename:'welu',lastname:'gebre',result:[{eng:23,maths:40,biology:70,tigrigna:45,amharic:89,chemistry:67,physics:80,civic:59,geography:78}]},
    {id:3,name:'tsegay',middlename:'welu',lastname:'gebre',result:[{eng:23,maths:40,biology:70,tigrigna:45,amharic:89,chemistry:67,physics:80,civic:59,geography:78}]},
    {id:4,name:'tsegay',middlename:'welu',lastname:'gebre',result:[{eng:23,maths:40,biology:70,tigrigna:45,amharic:89,chemistry:67,physics:80,civic:59,geography:78}]}
]
export const getAll=()=>{
    return appdata
}
export const getone=(id)=>{
    const u = appdata.find(u=>u.id = id)
    return u
}


const AboutUs = ()=>{
  return (
    <section className="container mx-auto py-4 pb-16 px-4 sm:px-6 lg:px-8  h-full ">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8"> */}
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className=" max-h-[90vh] overflow-auto flex flex-col pb-14">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">ልኡኽ ቢሮ ትምህርቲ</h2>
                <div className="mt-4 text-gray-600 text-lg overflow-auto">
                
                 {/* <h2 className="">ልኡኽ ቢሮ ትምህርቲ</h2> */}
                <p>
                    ልኡኽና ካብ ቅድመ ስሩዕ ትምህርቲ ክሳብ መሰናድኦ ዘድሊ ናውትን ንብርኪ ቤት ትምህርትና ፕሮፋይል ዘማልኡ መምህራንን ኣመራርሓ ትምህርትን ብምጥቃም 
                    ፃዕርን ተሳትፎን ሰብ ብፅሒት ብምክታት ሰለጤንን ፅርየትን ትምህርቲ ብምምላእን ብምስትምሃርን ብስነ ዜጋን ስነ ምግባርን ዝተሃነፁ መሰረታዊ ሳይንሳዊ ፍልጠትን
                    ኣገባባትን ዝጨበጡ ንዝቕፅል ደረጃ ክፍልን ሞያዊ ስልጠናን ድልዊ ዝኾኑ ዜጋታት ምፍራይ እዩ ።

                    ራእይ ቢሮ ትምህርቲ
                    ራኢና ክሳብ 2022 ዓ.ም ኣብዘሎ እነምህሮም ተምሃሮ ኩለመዳያዊ ስብእንኦም ዝተማልአ፣ ፆታዊ ማዕርነት ዘረጋገፁ፣ በብብርኩ ተወዳደርቲ ፣ ምሃዝትን 
                    ምስ 
                    ሳይንስን ቴክኖሎጂን ዝተላለዩ ኮይኖም ምርኣይ እዩ፡፡
                </p>
                <h4 className=" font-bold mb-2 mt-3">ክብርታትና /CORE VALUES</h4>
                <ul className="list-disc">
                    <li className=" list-item">ፍቕሪ፣ ክንክንን ሓልዮትን ተምሃሮ</li>
                    <li className=" list-item">ባህሊ ፈጠራን ተግባራዊ መፅናዕትን</li>
                    <li className=" list-item">ኣሳታፋይነት ትምህርቲ</li>
                    <li className=" list-item">ዘየቋርፅ ሞያዊ ምምሕያሽ</li>
                    <li className=" list-item">ምቅድዳሕ ዝፅየፍ ማሕበረሰብ ትምህርቲ</li>
                    <li className=" list-item">ስርፀትን ምምዕባልን ባህሊ ዲሞክራሲያውነት</li>
                    <li className=" list-item">ፆታዊ ማዕርነት</li>
                    <li className=" list-item">ኣተሓሳስባ ልምዓታዊ ሰራዊት ትምህርቲ</li>
                    <li className=" list-item">ብውፅኢት ተምሃሮ ንልካዕ</li>
                    <li className=" list-item">ዘየቛርፅ ቃልሲ ክራይ ኣካብነት</li>
                </ul>
                </div>
                <div className="">
                    <a href="https://www.tigrayeducation.org" target='blank' className="text-blue-500 hover:text-blue-600 font-medium">Learn more about us
                        <span className="ml-2">&#8594;</span></a>
                </div>
            </div>
            <div className="mt-12 md:mt-0">
                <img src="https://images.unsplash.com/photo-1531973576160-7125cd663d86" alt="About Us Image" className="object-cover rounded-lg shadow-md"/>
            </div>
        </div>
    </section>
  )
}

export default AboutUs

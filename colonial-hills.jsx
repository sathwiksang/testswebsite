import { useState, useEffect, useRef } from "react";

/* ═══ MIXED PALETTE: Ivory + Navy + Scripture Red ═══
   Warm ivory base (Palette 1), navy authority (Palette 2),
   muted scripture red accent (Palette 8), warm gold detail
*/
const C = {
  bg: "#FAF8F3",
  surface: "#F2EFEA",
  parchment: "#F7F3EB",
  cream: "#FFFDF6",
  white: "#FFFFFF",
  ink: "#2B2520",
  mid: "#44403A",
  soft: "#6E685F",
  faint: "#A29B91",
  pale: "#CCC6BA",
  navy: "#0F2A4A",
  navyMid: "#1A3D66",
  navyPale: "#8BA3BF",
  red: "#7E2D34",
  redLight: "#9B4048",
  redPale: "#D4A0A5",
  gold: "#BFA265",
  goldLight: "#D4BD88",
  goldPale: "#E9DDBF",
  border: "#E0DAD0",
  borderF: "#EBE6DC",
  dark: "#111A26",
};

function useV(t=0.08){const r=useRef(null);const[v,s]=useState(false);useEffect(()=>{const el=r.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){s(true);o.unobserve(el)}},{threshold:t});o.observe(el);return()=>o.disconnect()},[t]);return[r,v]}
function Rv({children,delay=0,style={}}){const[ref,v]=useV();return<div ref={ref} style={{opacity:v?1:0,transform:v?"none":"translateY(24px)",transition:`opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,...style}}>{children}</div>}

function Tag({children,style={}}){return<span style={{fontFamily:"'Lora',serif",fontSize:11,fontWeight:400,letterSpacing:"0.18em",textTransform:"uppercase",color:C.gold,...style}}>{children}</span>}

/* ═══ NAV ═══ */
function Nav({scrolled}){
  const links=["About","Gatherings","Events","Contact"];
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:500,background:scrolled?"rgba(250,248,243,0.95)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",WebkitBackdropFilter:scrolled?"blur(20px)":"none",transition:"all 0.5s cubic-bezier(0.22,1,0.36,1)",borderBottom:scrolled?`1px solid ${C.borderF}`:"none"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:scrolled?"16px 56px":"28px 56px",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"padding 0.5s cubic-bezier(0.22,1,0.36,1)"}}>
        <a href="#" style={{textDecoration:"none"}}>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:13.5,fontWeight:400,letterSpacing:"0.2em",textTransform:"uppercase",color:C.navy}}>Colonial Hills</span>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:36}}>
          {links.map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`} style={{fontFamily:"'Lora',serif",fontSize:13.5,fontWeight:400,color:C.soft,textDecoration:"none",transition:"color 0.3s",letterSpacing:"0.02em"}}
            onMouseEnter={e=>e.target.style.color=C.navy}
            onMouseLeave={e=>e.target.style.color=C.soft}
            >{l}</a>
          ))}
        </div>
        <span style={{fontFamily:"'Lora',serif",fontSize:13.5,fontWeight:400,color:C.soft,letterSpacing:"0.02em"}}>281.931.1120</span>
      </div>
    </nav>
  );
}

/* ═══ HERO ═══ */
function Hero(){
  return(
    <section style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"180px 56px 140px",position:"relative"}}>
      <Rv>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:400,letterSpacing:"0.32em",textTransform:"uppercase",color:C.faint,marginBottom:44}}>Bible Chapel &middot; Houston, Texas &middot; Est. 1975</div>
      </Rv>
      <Rv delay={0.08}>
        <h1 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(38px,5.5vw,74px)",fontWeight:400,color:C.navy,letterSpacing:"0.06em",lineHeight:1.12,textTransform:"uppercase",margin:"0 0 40px"}}>Colonial Hills</h1>
      </Rv>
      <Rv delay={0.18}>
        <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:44}}>
          <div style={{width:56,height:1,background:C.gold}}/>
          <div style={{width:6,height:6,border:`1px solid ${C.gold}`,transform:"rotate(45deg)"}}/>
          <div style={{width:56,height:1,background:C.gold}}/>
        </div>
      </Rv>
      <Rv delay={0.26}>
        <blockquote style={{fontFamily:"'Lora',serif",fontSize:"clamp(17px,2.2vw,22px)",fontWeight:400,fontStyle:"italic",color:C.mid,lineHeight:1.8,maxWidth:580,margin:"0 0 20px"}}>
          "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life."
        </blockquote>
        <Tag>John 3:16</Tag>
      </Rv>
      <Rv delay={0.36}>
        <div style={{display:"flex",gap:20,marginTop:52}}>
          <a href="#gatherings" style={{fontFamily:"'Cinzel',serif",fontSize:11,fontWeight:400,letterSpacing:"0.14em",textTransform:"uppercase",background:C.navy,color:C.cream,padding:"16px 40px",textDecoration:"none",transition:"all 0.3s"}}
          onMouseEnter={e=>e.target.style.background=C.navyMid}
          onMouseLeave={e=>e.target.style.background=C.navy}
          >Our Gatherings</a>
          <a href="#about" style={{fontFamily:"'Cinzel',serif",fontSize:11,fontWeight:400,letterSpacing:"0.14em",textTransform:"uppercase",color:C.navy,padding:"16px 40px",border:`1px solid ${C.navy}`,textDecoration:"none",background:"transparent",transition:"all 0.3s"}}
          onMouseEnter={e=>{e.target.style.background=C.navy;e.target.style.color=C.cream}}
          onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=C.navy}}
          >About Us</a>
        </div>
      </Rv>
      <div style={{position:"absolute",bottom:0,left:56,right:56,height:1,background:C.border}}/>
    </section>
  );
}

/* ═══ ABOUT — Split with navy verse panel ═══ */
function About(){
  return(
    <section id="about" style={{padding:0,background:C.surface}}>
      <div style={{display:"grid",gridTemplateColumns:"5fr 7fr"}}>
        {/* Left: verse on navy */}
        <div style={{background:C.navy,padding:"96px 56px",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative"}}>
          {/* Corner accents */}
          <div style={{position:"absolute",top:20,left:20,width:36,height:36,borderTop:`1.5px solid ${C.goldLight}`,borderLeft:`1.5px solid ${C.goldLight}`,opacity:0.25}}/>
          <div style={{position:"absolute",bottom:20,right:20,width:36,height:36,borderBottom:`1.5px solid ${C.goldLight}`,borderRight:`1.5px solid ${C.goldLight}`,opacity:0.25}}/>
          <Rv>
            <div style={{fontFamily:"'Lora',serif",fontSize:52,fontWeight:400,color:C.goldPale,lineHeight:0.9,opacity:0.3,marginBottom:-4}}>&ldquo;</div>
            <blockquote style={{fontFamily:"'Lora',serif",fontSize:21,fontWeight:400,fontStyle:"italic",color:"rgba(255,255,255,0.88)",lineHeight:1.7,margin:"0 0 28px"}}>
              Where two or three are gathered together in My name, there am I in the midst of them.
            </blockquote>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:24,height:1.5,background:C.gold,borderRadius:1}}/>
              <Tag>Matthew 18:20</Tag>
            </div>
          </Rv>
        </div>

        {/* Right: welcome */}
        <div style={{padding:"96px 64px",background:C.cream,display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <Rv>
            <Tag style={{display:"block",marginBottom:18}}>Welcome</Tag>
            <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(22px,2.8vw,32px)",fontWeight:400,color:C.navy,letterSpacing:"0.07em",textTransform:"uppercase",lineHeight:1.3,margin:"0 0 32px"}}>We Are Glad You Are Here</h2>
          </Rv>
          <Rv delay={0.06}>
            <p style={{fontFamily:"'Lora',serif",fontSize:17,fontWeight:400,lineHeight:1.85,color:C.mid,marginBottom:22}}>
              We are thankful that you've taken the time to visit Colonial Hills Bible Chapel. Our desire is to honor the Lord Jesus Christ and to follow the pattern of gathering revealed in the New Testament.
            </p>
          </Rv>
          <Rv delay={0.1}>
            <p style={{fontFamily:"'Lora',serif",fontSize:15.5,fontWeight:400,lineHeight:1.85,color:C.soft,marginBottom:22}}>
              We meet simply as believers redeemed by God's grace, gathered to the name of the Lord Jesus Christ. The Scriptures are our sole authority, guiding our worship, fellowship, and service.
            </p>
          </Rv>
          <Rv delay={0.14}>
            <p style={{fontFamily:"'Lora',serif",fontSize:15.5,fontWeight:400,lineHeight:1.85,color:C.soft}}>
              Whether you are seeking to know the Savior or looking for a place to grow in His Word, we warmly invite you to visit — and share in the simplicity and joy of New Testament fellowship.
            </p>
          </Rv>
        </div>
      </div>
    </section>
  );
}

/* ═══ SCRIPTURE ═══ */
function Scripture({verse,ref_}){
  return(
    <section style={{padding:"68px 56px",background:C.navy,textAlign:"center"}}>
      <Rv>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{fontFamily:"'Lora',serif",fontSize:"clamp(17px,2vw,21px)",fontWeight:400,fontStyle:"italic",color:"rgba(255,255,255,0.85)",lineHeight:1.8,marginBottom:18}}>"{verse}"</div>
          <div style={{display:"inline-flex",alignItems:"center",gap:14}}>
            <div style={{width:28,height:1,background:C.gold,opacity:0.5}}/>
            <span style={{fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:400,letterSpacing:"0.22em",textTransform:"uppercase",color:C.goldLight}}>{ref_}</span>
            <div style={{width:28,height:1,background:C.gold,opacity:0.5}}/>
          </div>
        </div>
      </Rv>
    </section>
  );
}

/* ═══ MEETINGS — Three-column ruled ═══ */
function Meetings(){
  const days=[
    {day:"Lord's Day",items:[
      {time:"9:30 AM",name:"Breaking of Bread",note:"Remembrance of the Lord Jesus"},
      {time:"10:30 AM",name:"Fellowship Time",note:"Refreshment between meetings"},
      {time:"11:00 AM",name:"Family Bible Hour",note:"Ministry of God's Word"},
      {time:"11:00 AM",name:"Sunday School",note:"Bible instruction for children"},
    ]},
    {day:"Wednesday",items:[
      {time:"7:00 PM",name:"Prayer & Bible Study",note:"Also online via WebEx"},
    ]},
    {day:"Saturday",items:[
      {time:"9:00 AM",name:"Men's Prayer Meeting",note:"Weekly intercession"},
      {time:"9:00 AM",name:"Women's Bible Study",note:"Growing in the Word"},
      {time:"9:00 AM",name:"Men's Breakfast & Prayer",note:"Second Saturday monthly"},
    ]},
  ];

  return(
    <section id="gatherings" style={{padding:"120px 56px",background:C.bg}}>
      <div style={{maxWidth:1080,margin:"0 auto"}}>
        <Rv>
          <div style={{textAlign:"center",marginBottom:56}}>
            <Tag style={{display:"block",marginBottom:16}}>Join Us</Tag>
            <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(22px,2.8vw,32px)",fontWeight:400,color:C.navy,letterSpacing:"0.07em",textTransform:"uppercase",lineHeight:1.3,margin:0}}>Our Gatherings</h2>
          </div>
        </Rv>

        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:0,borderTop:`2px solid ${C.navy}`}}>
          {days.map((group,gi)=>(
            <Rv key={gi} delay={gi*0.08}>
              <div style={{padding:gi===1?"32px 40px":"32px 0",paddingLeft:gi===0?0:40,paddingRight:gi===2?0:40,borderLeft:gi>0?`1px solid ${C.border}`:"none",height:"100%"}}>
                {/* Day header */}
                <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:400,letterSpacing:"0.16em",textTransform:"uppercase",color:C.red,marginBottom:28,paddingBottom:14,borderBottom:`1px solid ${C.borderF}`}}>{group.day}</div>
                {group.items.map((m,mi)=>(
                  <div key={mi} style={{marginBottom:mi<group.items.length-1?22:0}}>
                    <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontFamily:"'Lora',serif",fontSize:16,fontWeight:400,color:C.ink}}>{m.name}</span>
                      <span style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:400,letterSpacing:"0.04em",color:C.navy,whiteSpace:"nowrap",marginLeft:12}}>{m.time}</span>
                    </div>
                    <div style={{fontFamily:"'Lora',serif",fontSize:13,fontWeight:400,color:C.faint,fontStyle:"italic"}}>{m.note}</div>
                  </div>
                ))}
              </div>
            </Rv>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ EVENTS ═══ */
function Events(){
  const events=[
    {m:"Feb",d:20,w:"Friday",title:"Monthly Cottage Prayer Meeting",time:"7:00 PM",desc:"The monthly cottage prayer meeting. Location to be announced."},
    {m:"Feb",d:21,w:"Saturday",title:"Workday at Morgan House",time:"8:00 AM - 2:00 PM",desc:"Join us for a workday at Morgan House."},
    {m:"Feb",d:22,w:"Lord's Day",title:"Hot Luncheon",time:"12:00 PM",desc:"Join us for a hot luncheon after the morning meetings."},
  ];

  return(
    <section id="events" style={{padding:"120px 56px",background:C.surface}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <Rv>
          <div style={{textAlign:"center",marginBottom:56}}>
            <Tag style={{display:"block",marginBottom:16}}>Announcements</Tag>
            <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(22px,2.8vw,32px)",fontWeight:400,color:C.navy,letterSpacing:"0.07em",textTransform:"uppercase",lineHeight:1.3,margin:0}}>Upcoming Events</h2>
          </div>
        </Rv>
        {events.map((e,i)=>(
          <Rv key={i} delay={i*0.06}>
            <div style={{display:"grid",gridTemplateColumns:"68px 1fr auto",gap:28,padding:"28px 0",borderTop:i===0?`2px solid ${C.navy}`:`1px solid ${C.border}`,alignItems:"start"}}>
              <div style={{textAlign:"center",paddingTop:2}}>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:30,fontWeight:400,color:C.navy,lineHeight:1}}>{e.d}</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:9.5,fontWeight:400,letterSpacing:"0.14em",textTransform:"uppercase",color:C.red,marginTop:4}}>{e.m}</div>
              </div>
              <div>
                <h4 style={{fontFamily:"'Lora',serif",fontSize:19,fontWeight:400,color:C.ink,margin:"0 0 4px",lineHeight:1.35}}>{e.title}</h4>
                <span style={{fontFamily:"'Lora',serif",fontSize:12.5,fontWeight:400,color:C.faint,fontStyle:"italic"}}>{e.w}</span>
                <p style={{fontFamily:"'Lora',serif",fontSize:15,fontWeight:400,color:C.soft,lineHeight:1.7,margin:"8px 0 0"}}>{e.desc}</p>
              </div>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:11.5,fontWeight:400,letterSpacing:"0.05em",color:C.red,whiteSpace:"nowrap"}}>{e.time}</span>
            </div>
          </Rv>
        ))}
      </div>
    </section>
  );
}

/* ═══ MINISTRY — Four-column ruled ═══ */
function Ministry(){
  const items=[
    {n:"I",t:"Worship",b:"Each Lord's Day morning we gather to remember the death and resurrection of Christ by partaking of the bread and wine. We celebrate His great love, and count the enormous benefits we have received."},
    {n:"II",t:"Prayer",b:"We need the Lord's help in forgiving one another. To integrate Christian worldviews in our children's lives, we need His help. So we pray corporately that God will build His church."},
    {n:"III",t:"Scripture",b:"The Bible is God's instructional manual for life. Each Lord's Day we listen to a Bible lesson, and think through its implications for our individual lives."},
    {n:"IV",t:"Fellowship",b:"We are brothers and sisters, related to one another as followers of Christ. We like to have meals together, strengthening the bonds of our community in love."},
  ];

  return(
    <section style={{padding:"120px 56px",background:C.bg}}>
      <div style={{maxWidth:1080,margin:"0 auto"}}>
        <Rv>
          <div style={{textAlign:"center",marginBottom:64}}>
            <Tag style={{display:"block",marginBottom:16}}>Our Life Together</Tag>
            <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(22px,2.8vw,32px)",fontWeight:400,color:C.navy,letterSpacing:"0.07em",textTransform:"uppercase",lineHeight:1.3,margin:0}}>How We Gather</h2>
          </div>
        </Rv>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,borderTop:`2px solid ${C.navy}`}}>
          {items.map((item,i)=>(
            <Rv key={i} delay={i*0.05}>
              <div style={{padding:"40px 36px",borderBottom:`1px solid ${C.border}`,borderRight:i%2===0?`1px solid ${C.border}`:"none",height:"100%",transition:"background 0.35s",cursor:"default"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.cream}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:400,letterSpacing:"0.18em",color:C.red,marginBottom:16}}>{item.n}</div>
                <h3 style={{fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:400,letterSpacing:"0.1em",textTransform:"uppercase",color:C.navy,margin:"0 0 16px",lineHeight:1.3}}>{item.t}</h3>
                <p style={{fontFamily:"'Lora',serif",fontSize:15,fontWeight:400,lineHeight:1.85,color:C.soft,margin:0}}>{item.b}</p>
              </div>
            </Rv>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CONTACT ═══ */
function Contact(){
  return(
    <section id="contact" style={{padding:"120px 56px",background:C.surface}}>
      <div style={{maxWidth:880,margin:"0 auto"}}>
        <Rv>
          <div style={{textAlign:"center",marginBottom:56}}>
            <Tag style={{display:"block",marginBottom:16}}>Visit Us</Tag>
            <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(22px,2.8vw,32px)",fontWeight:400,color:C.navy,letterSpacing:"0.07em",textTransform:"uppercase",lineHeight:1.3,margin:0}}>Plan Your Visit</h2>
          </div>
        </Rv>

        <Rv delay={0.06}>
          <div style={{borderTop:`2px solid ${C.navy}`,paddingTop:44,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:44}}>
            {/* Location */}
            <div>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:400,letterSpacing:"0.2em",textTransform:"uppercase",color:C.red,display:"block",marginBottom:16}}>Location</span>
              <div style={{fontFamily:"'Lora',serif",fontSize:17,fontWeight:400,color:C.ink,lineHeight:1.5,marginBottom:18}}>
                14643 Henry Rd<br/>Houston, TX 77060
              </div>
              <p style={{fontFamily:"'Lora',serif",fontSize:14,fontWeight:400,color:C.soft,lineHeight:1.7,margin:0}}>
                Located in North Houston. We welcome all who desire to gather in the Lord's name.
              </p>
            </div>

            {/* Contact */}
            <div>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:400,letterSpacing:"0.2em",textTransform:"uppercase",color:C.red,display:"block",marginBottom:16}}>Contact</span>
              <div style={{display:"flex",flexDirection:"column",gap:18}}>
                <div>
                  <div style={{fontFamily:"'Lora',serif",fontSize:12,fontWeight:400,color:C.faint,fontStyle:"italic",marginBottom:3}}>Telephone</div>
                  <div style={{fontFamily:"'Lora',serif",fontSize:16,fontWeight:400,color:C.ink}}>+1 281 931 1120</div>
                </div>
                <div>
                  <div style={{fontFamily:"'Lora',serif",fontSize:12,fontWeight:400,color:C.faint,fontStyle:"italic",marginBottom:3}}>Email</div>
                  <div style={{fontFamily:"'Lora',serif",fontSize:13.5,fontWeight:400,color:C.ink,wordBreak:"break-all"}}>info@colonialhills-biblechapel.com</div>
                </div>
              </div>
            </div>

            {/* Meeting Times */}
            <div>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:400,letterSpacing:"0.2em",textTransform:"uppercase",color:C.red,display:"block",marginBottom:16}}>Meeting Times</span>
              {[
                {d:"Lord's Day",t:"9:30 AM"},
                {d:"Lord's Day",t:"11:00 AM"},
                {d:"Wednesday",t:"7:00 PM"},
                {d:"Saturday",t:"9:00 AM"},
              ].map((s,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",paddingBottom:12,marginBottom:12,borderBottom:i<3?`1px solid ${C.borderF}`:"none"}}>
                  <span style={{fontFamily:"'Lora',serif",fontSize:14,fontWeight:400,color:C.soft}}>{s.d}</span>
                  <span style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:400,letterSpacing:"0.04em",color:C.navy}}>{s.t}</span>
                </div>
              ))}
            </div>
          </div>
        </Rv>

        <Rv delay={0.12}>
          <div style={{marginTop:52,borderTop:`1px solid ${C.border}`,paddingTop:44,textAlign:"center",maxWidth:560,marginLeft:"auto",marginRight:"auto"}}>
            <span style={{fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:400,letterSpacing:"0.2em",textTransform:"uppercase",color:C.red,display:"block",marginBottom:16}}>What to Expect</span>
            <p style={{fontFamily:"'Lora',serif",fontSize:16,fontWeight:400,color:C.mid,lineHeight:1.85,margin:0}}>
              Our meetings are Christ-centered and Spirit-led. You will find a warm welcome, reverence for God's Word, and the simplicity of New Testament gathering. Come as you are — it is our joy to know His presence among us.
            </p>
          </div>
        </Rv>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer(){
  return(
    <footer style={{background:C.dark,padding:"60px 56px 28px"}}>
      <div style={{maxWidth:1080,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",paddingBottom:44,borderBottom:"1px solid rgba(255,255,255,0.07)",gap:72}}>
          <div style={{flex:"0 0 auto"}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:400,letterSpacing:"0.2em",textTransform:"uppercase",color:"#fff",marginBottom:8}}>Colonial Hills</div>
            <div style={{fontFamily:"'Lora',serif",fontSize:11,fontWeight:400,letterSpacing:"0.1em",textTransform:"uppercase",color:C.goldLight,marginBottom:18}}>Bible Chapel</div>
            <p style={{fontFamily:"'Lora',serif",fontSize:13,lineHeight:1.7,color:"rgba(255,255,255,0.28)",maxWidth:240}}>Gathering solely in the name of the Lord Jesus Christ, holding fast to New Testament principles.</p>
          </div>
          <div style={{display:"flex",gap:56}}>
            <div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:9,fontWeight:400,letterSpacing:"0.2em",textTransform:"uppercase",color:C.goldLight,marginBottom:16}}>Navigate</div>
              {["About","Gospel","Gatherings","Events","Contact"].map(l=>(
                <a key={l} href="#" style={{display:"block",fontFamily:"'Lora',serif",fontSize:13,color:"rgba(255,255,255,0.28)",textDecoration:"none",marginBottom:9,transition:"color 0.3s"}}
                onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.65)"}
                onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.28)"}
                >{l}</a>
              ))}
            </div>
            <div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:9,fontWeight:400,letterSpacing:"0.2em",textTransform:"uppercase",color:C.goldLight,marginBottom:16}}>Meetings</div>
              {["Lord's Day: 9:30 AM","Bible Hour: 11:00 AM","Wednesday: 7:00 PM","Saturday: 9:00 AM"].map(t=>(
                <div key={t} style={{fontFamily:"'Lora',serif",fontSize:13,color:"rgba(255,255,255,0.28)",marginBottom:9}}>{t}</div>
              ))}
            </div>
            <div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:9,fontWeight:400,letterSpacing:"0.2em",textTransform:"uppercase",color:C.goldLight,marginBottom:16}}>Contact</div>
              <div style={{fontFamily:"'Lora',serif",fontSize:13,color:"rgba(255,255,255,0.28)",lineHeight:1.7}}>14643 Henry Rd<br/>Houston, TX 77060<br/><br/>281.931.1120<br/>info@colonialhills-biblechapel.com</div>
            </div>
          </div>
        </div>
        <div style={{paddingTop:22,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontFamily:"'Lora',serif",fontSize:11,color:"rgba(255,255,255,0.14)"}}>2026 Colonial Hills Bible Chapel</span>
          <span style={{fontFamily:"'Lora',serif",fontSize:12,fontStyle:"italic",color:"rgba(255,255,255,0.16)"}}>"The Gift of God is Eternal Life Through Jesus Christ Our Lord"</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══ APP ═══ */
export default function App(){
  const[scrolled,setScrolled]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h)},[]);

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:${C.bg};-webkit-font-smoothing:antialiased}
        ::selection{background:${C.navy};color:${C.cream}}
      `}</style>
      <Nav scrolled={scrolled}/>
      <Hero/>
      <About/>
      <Scripture verse="Let the little children come to Me, and do not forbid them; for of such is the kingdom of God." ref_="Mark 10:14"/>
      <Meetings/>
      <Events/>
      <Ministry/>
      <Scripture verse="Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another." ref_="Hebrews 10:25"/>
      <Contact/>
      <Footer/>
    </>
  );
}
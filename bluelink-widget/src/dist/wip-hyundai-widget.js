const t=Device.isUsingDarkAppearance();async function e(t){return new Request(t).loadImage()}function a(t){return Color.orange()}const o=await async function(){const o=await e(t?"https://github.com/jesuslopezreynosa/ios-scriptable-widget-Hyundai-Bluelink/blob/master/bluelink-widget/images/manufacturers/hyundai-dark-mode.png":"https://github.com/jesuslopezreynosa/ios-scriptable-widget-Hyundai-Bluelink/blob/master/bluelink-widget/images/manufacturers/hyundai-light-mode.png"),n=new ListWidget;n.url="hyundai-usa://";const i=n.addStack();i.layoutVertically(),n.backgroundColor=t?new Color("1C3767"):new Color("FFFFFF"),i.addSpacer();const d=i.addStack(),r=d.addText("IONIQ 5");r.textColor=t?Color.white():Color.black(),r.textOpacity=.7,r.font=Font.mediumSystemFont(18),d.addSpacer(),d.addImage(o).imageSize=new Size(30,30),i.addSpacer();const c=i.addStack(),l=await e("https://github.com/jesuslopezreynosa/ios-scriptable-widget-Hyundai-Bluelink/blob/master/bluelink-widget/images/vehicles/2024-Hyundai-IONIQ_5-white-full_color-driver_side_front_quarter.png");c.addImage(l).imageSize=new Size(150,90),c.addSpacer();const s=c.addStack();s.layoutVertically(),s.addSpacer();const u=s.addStack();u.addSpacer();const m=u.addText("180 mi");m.font=Font.mediumSystemFont(20),m.textColor=t?Color.white():Color.black(),m.rightAlignText(),s.addSpacer();const g=s.addStack();g.addSpacer(),g.centerAlignContent();const{batteryIcon:S,batteryIconColor:p}=function(){let t,e;{let o=0;e=Color.red(),o=75,e=a(),t=SFSymbol.named(`battery.${o}`)}return{batteryIcon:t,batteryIconColor:e}}(),y=g.addImage(S.image);y.imageSize=new Size(25,25),y.tintColor=p,g.addSpacer(8);const b=g.addText("75%");b.textColor=a(),b.font=Font.boldSystemFont(20),s.addSpacer();const w=i.addStack(),C=`${5300..toLocaleString()} mi`,k=w.addText(C);return k.font=Font.mediumSystemFont(10),k.textColor=t?Color.white():Color.black(),k.textOpacity=.5,k.minimumScaleFactor=.5,k.leftAlignText(),w.addSpacer(),n}();config.runsInWidget?Script.setWidget(o):o.presentMedium(),Script.complete();
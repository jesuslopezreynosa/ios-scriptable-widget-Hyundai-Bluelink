const e=Device.isUsingDarkAppearance();async function t(e){return new Request(e).loadImage()}function o(e){return Color.green()}const a=await async function(){const a=(new Date).setHours(-4),n=await t(e?"https://raw.githubusercontent.com/jesuslopezreynosa/ios-scriptable-widget-Hyundai-Bluelink/refs/heads/main/bluelink-widget/images/manufacturers/hyundai-dark-mode.png":"https://raw.githubusercontent.com/jesuslopezreynosa/ios-scriptable-widget-Hyundai-Bluelink/refs/heads/main/bluelink-widget/images/manufacturers/hyundai-light-mode.png"),i=new ListWidget;i.url="hyundai-usa://";const r=i.addStack();r.layoutVertically(),i.backgroundColor=e?new Color("1C3767"):new Color("FFFFFF"),r.addSpacer();const d=r.addStack(),c=d.addText("IONIQ 5");c.textColor=e?Color.white():Color.black(),c.textOpacity=.7,c.font=Font.mediumSystemFont(22),d.addSpacer(),d.addImage(n).imageSize=new Size(35,35),r.addSpacer();const l=r.addStack(),s=await t("https://raw.githubusercontent.com/jesuslopezreynosa/ios-scriptable-widget-Hyundai-Bluelink/refs/heads/main/bluelink-widget/images/vehicles/2024-Hyundai-IONIQ_5-white-full_color-driver_side_front_quarter.png");l.addImage(s).imageSize=new Size(175,90),l.addSpacer();const m=l.addStack();m.layoutVertically(),m.addSpacer();const u=m.addStack();u.addSpacer(),u.centerAlignContent();const{batteryIcon:g,batteryIconColor:S}=function(){let e,t;{let a=0;t=Color.red(),a=75,t=o(),e=SFSymbol.named(`battery.${a}`)}return{batteryIcon:e,batteryIconColor:t}}(),p=u.addImage(g.image);p.imageSize=new Size(35,35),p.tintColor=S,u.addSpacer(8);const y=u.addText("75%");y.textColor=o(),y.font=Font.boldSystemFont(22),m.addSpacer();const C=m.addStack();C.addSpacer(),C.centerAlignContent();const{locationPinIcon:w,locationPinIconColor:b}={locationPinIcon:SFSymbol.named("mappin.and.ellipse"),locationPinIconColor:e?Color.white():Color.black()},h=C.addImage(w.image);h.imageSize=new Size(15,15),h.tintColor=b,C.addSpacer(8);const k=C.addText("Elk Grove, CA");k.font=Font.mediumSystemFont(14),k.textColor=e?Color.white():Color.black(),k.rightAlignText(),m.addSpacer();const F=r.addStack(),f=`${5300..toLocaleString()} mi`,I=F.addText(f);I.font=Font.mediumSystemFont(12),I.textColor=e?Color.white():Color.black(),I.textOpacity=.5,I.minimumScaleFactor=.5,I.leftAlignText(),F.addSpacer();const x=new Date(a),z=F.addDate(x);return z.font=Font.mediumSystemFont(10),z.textOpacity=.5,z.textColor=e?Color.white():Color.black(),z.minimumScaleFactor=.5,z.rightAlignText(),r.addSpacer(),i}();config.runsInWidget?Script.setWidget(a):a.presentMedium(),Script.complete();

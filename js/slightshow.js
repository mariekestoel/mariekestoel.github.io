// hier definieer je alle afbeeldingen
var afbeeldingen=new Array()
afbeeldingen[0]=["Pictures/mama1.jpg", "#"] // "pad en naam van de foto", "eventuele hyperlink"
afbeeldingen[1]=["Pictures/mama2.jpg", "#"]
afbeeldingen[2]=["Pictures/mama3.jpg", "#"]
afbeeldingen[3]=["Pictures/mama4.jpg", "#"]
afbeeldingen[4]=["Pictures/mamalessen1.jpg", "#"]
afbeeldingen[5]=["Pictures/mamalessen2.jpg", "#"]
afbeeldingen[6]=["Pictures/mamalessen3.jpg", "#"]
afbeeldingen[7]=["Pictures/.jpg", "#"]
afbeeldingen[8]=["Pictures/.jpg", "#"]
afbeeldingen[9]=["Pictures/.jpg", "#"]

var voorladen="ja" // "ja" of "nee"
var optlinktarget="" // optioneel: hier kun je een target invullen bij framesgebruik
var beeldrandbreedte=0
var filterstring="progid:DXImageTransform.Microsoft.GradientWipe(GradientSize=1.0 Duration=0.7)"

// hieronder niets wijzigen

if (voorladen=="ja"){
for (x=0; x<afbeeldingen.length; x++){
var ditbeeldje=new Image()
ditbeeldje.src=afbeeldingen[x][0]}}

function beeldcode(dezeafbeelding){
var beeldhtml=""
if (dezeafbeelding[1]!="")
beeldhtml='<a href="'+dezeafbeelding[1]+'" target="'+optlinktarget+'">'
beeldhtml+='<img src="'+dezeafbeelding[0]+'" border="'+beeldrandbreedte+'">'
if (dezeafbeelding[1]!="")
beeldhtml+='</a>'
return beeldhtml}

function wijzigbeeld(beeldplaatsing, beeldindex){
if (document.getElementById){
var imgobj=document.getElementById(beeldplaatsing)
if (imgobj.filters && window.createPopup){
imgobj.style.filter=filterstring
imgobj.filters[0].Apply()}
imgobj.innerHTML=beeldcode(afbeeldingen[beeldindex])
if (imgobj.filters && window.createPopup)
imgobj.filters[0].Play()
return false}}

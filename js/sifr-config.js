var kozuka_el = { src: '../flash/kozuka_gothic_pro_el.swf' };
var kristen_itc = { src: '../flash/kristen_itc.swf' };
var officina_bold = { src: '../flash/officina_sans_std_bold.swf' };
sIFR.activate(kozuka_el,officina_bold, kristen_itc);


sIFR.replace(kristen_itc, { 
  selector: '-menu',
  css: [ 
    '.sIFR-root { font-size: 25px; color: #FDDE12; margin-left: 43px; }'
  ],
  wmode: 'transparent'
});


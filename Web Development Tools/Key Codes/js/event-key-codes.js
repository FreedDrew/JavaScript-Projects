document.addEventListener("keydown", function(e) {

	console.log(e);

	document.body.innerHTML = `
<pre>
<b> Key Pressed   :    ( ${event.key} ) </b>
<b> keyCode       :    ( ${event.keyCode} ) </b>
<b> shiftKey      :    ( ${event.shiftKey} ) </b>
<b> altKey        :    ( ${event.altKey} ) </b>
<b> ctrlKey       :    ( ${event.ctrlKey} ) </b>
<b> metaKey       :    ( ${event.metaKey} ) </b>
</pre>
  `;

});
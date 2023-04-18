function out() {
  var n2 = document.getElementById('n2')
  var n3 = document.getElementById('n3')
  var n4 = document.getElementById('n4')
  if (n2.style.right == '0px') {
    n2.style.right = '-50vw'
    n4.style.display = 'none'
    n3.style.display = 'inline-block'
  } else {
    n2.style.right = '0'
    n3.style.display = 'none'
    n4.style.display = 'inline-block'
  }
}

$(function() {
    $(".root_poly").draggable();
        
    $(".check_for_overlaps").on("click", check_for_overlaps);

});

function check_for_overlaps() {
  console.log("Checking for overlaps: ");

  var shapes = $('.poly1');
  results = "No overlaps detected";
    
  shapes.css('background-color', '');
  var overlapping_shapes = shapes.filter(function(index) {
    var poly = this;
    var count = shapes.filter(function(index) {
      console.log("-----");
      var lap = overlaps(this, poly);
      if (lap) {
        console.log("Overlap: " + $(this).attr('data_id') + ", " + $(poly).attr('data_id'));
        
      }
      console.log("-----");
      return lap;
    });
    if (count.length >=1) {
      results = "overlapping blocks detected";
    }
    return count.length >= 1;
  }).css('background-color', 'pink');
  
  console.log("overlappers" + overlapping_shapes.length);
  
  
  // console.log("does it overlap? " + overlaps('#shapeA4', '#shapeB'));
  //   console.log("does it overlap? " + overlaps('#shapeA3', '#shapeB'));
  //   console.log("does it overlap? " + overlaps('#shapeA4', '#shapeA3'));
  

  $('.overlap_results').html(results);
  return false;
}

function puzzle_position_top(div) {
  return $(div).offset()['top'];
}

function puzzle_position_left(div) {
  return $(div).offset()['left'];
}

function overlaps(div1, div2) {
    if ($(div1).attr('id') == $(div2).attr('id')) {
      return false;
    }
    top1 = puzzle_position_top(div1);
    left1 = puzzle_position_left(div1);
    width1 = $(div1).width();
    
    top2 = puzzle_position_top(div2);
    left2 = puzzle_position_left(div2)
    width2 = $(div2).width();
    
    
    return overlapping_coordinates(left1, top1, left1 + width1, top1 + width1, left2, top2, left2 + width2, top2 + width2);
}

function overlapping_coordinates(x1,y1,x2,y2,x3,y3,x4,y4) {
  console.log([x1,y1,x2,y2,x3,y3,x4,y4]);
  if ((x1 >= x3 && x1 <= x4) || (x2 >= x3 && x2 <= x4)) {
    return ((y1 >= y3 && y1 <= y4) || (y2 >= y3 && y2 <= y4));
  } else {
    return false;
  }

}



<?php
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$name=$firstname.$lastname;
$email = $_POST['email'];
$message = $_POST['message'];
$formcontent=" From: $name \n Message: $message";
$recipient = "admin@bootexperts.com";
$subject = "Add Your Subject Here";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
header("location: http://bootexperts.com/")
?>

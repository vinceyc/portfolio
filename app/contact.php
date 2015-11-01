<?php

$EmailTo = "vince.ys.chan@gmail.com";
$Subject = "Website Contact Form";
$Name = Trim(stripslashes($_POST['name']));
$Email = Trim(stripslashes($_POST['email']));
$Message = Trim(stripslashes($_POST['message']));

// validation
$validationOK=true;
if (!$validationOK) {
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From: <$Email>");

// redirect to success page
if ($success){
    echo '<script type="text/javascript">alert("Thank you for getting in touch!"); </script>';
    print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php\">";

}
else{
    echo '<script type="text/javascript">alert("Thank you for getting in touch!"); </script>';
}
?>
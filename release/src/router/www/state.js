﻿//For operation mode;
sw_mode = '<% nvram_get("sw_mode"); %>';
productid = '<% nvram_get("productid"); %>';

var uptimeStr = "<% uptime(); %>";
var timezone = uptimeStr.substring(26,31);
var boottime = parseInt(uptimeStr.substring(32,42));
var newformat_systime = uptimeStr.substring(8,11) + " " + uptimeStr.substring(5,7) + " " + uptimeStr.substring(17,25) + " " + uptimeStr.substring(12,16);  //Ex format: Jun 23 10:33:31 2008
var systime_millsec = Date.parse(newformat_systime); // millsec from system
var JS_timeObj = new Date(); // 1970.1.1
var wan_route_x = "";
var wan_nat_x = "";
var wan_proto = "";
var test_page = 0;
var testEventID = "";
var httpd_dir = "/cifs1"

// for detect if the status of the machine is changed. {
var wanstate = -1;
var wansbstate = -1;
var wanauxstate = -1;
var stopFlag = 0;

var gn_array_2g = <% wl_get_guestnetwork("0"); %>;
var gn_array_5g = <% wl_get_guestnetwork("1"); %>;
<% available_disk_names_and_sizes(); %>
<% disk_pool_mapping_info(); %>

// hide navibar on iOS
/*window.addEventListener("load", function(){ 
	setTimeout(scrollTo, 0, 0, 1);
}, false);*/

function unload_body(){
}

function enableCheckChangedStatus(){
}

function disableCheckChangedStatus(){
	stopFlag = 1;
}

function check_if_support_dr_surf(){
}

function check_changed_status(){
}

function get_changed_status(){
}

function set_changed_status(){
}

function set_Dr_work(){
}

function showHelpofDrSurf(){
}

function showDrSurf(){
}

function slowHide(){
}

function hideHint(){
}

function drdiagnose(){
}

function change_wl_unit_status(_unit){
	document.titleForm.wl_unit.disabled = false;
	document.titleForm.wl_unit.value = _unit;

	if(sw_mode == 2){
		if('<% nvram_get("wlc_band"); %>' == _unit)
			document.titleForm.wl_subunit.value = 1;
		else
			document.titleForm.wl_subunit.value = -1;
		document.titleForm.wl_subunit.disabled = false;
	}

	document.titleForm.current_page.value = "Advanced_Wireless_Content.asp";
	document.titleForm.next_page.value = "Advanced_Wireless_Content.asp";
	document.titleForm.action_mode.value = "change_wl_unit";
	document.titleForm.action = "apply.cgi";
	document.titleForm.target = "";
	document.titleForm.submit();
}

var banner_code, menu_code="", menu1_code="", menu2_code="", tab_code="", footer_code;
function show_banner(L3){// L3 = The third Level of Menu
	var banner_code = "";	

	banner_code +='<form method="post" name="titleForm" id="titleForm" action="/start_apply.htm" target="hidden_frame">\n';
	banner_code +='<input type="hidden" name="next_page" value="">\n';
	banner_code +='<input type="hidden" name="current_page" value="">\n';
	banner_code +='<input type="hidden" name="action_mode" value="apply">\n';
	banner_code +='<input type="hidden" name="action_script" value="">\n';
	banner_code +='<input type="hidden" name="action_wait" value="5">\n';
	banner_code +='<input type="hidden" name="wl_unit" value="" disabled>\n';
	banner_code +='<input type="hidden" name="wl_subunit" value="-1" disabled>\n';
	banner_code +='<input type="hidden" name="preferred_lang" value="">\n';
	banner_code +='<input type="hidden" name="flag" value="">\n';
	banner_code +='</form>\n';

	banner_code +='<form method="post" name="diskForm_title" action="/device-map/safely_remove_disk.asp" target="hidden_frame">\n';
	banner_code +='<input type="hidden" name="disk" value="">\n';
	banner_code +='</form>\n';

	banner_code +='<form method="post" name="internetForm_title" action="/start_apply2.htm" target="hidden_frame">\n';
	banner_code +='<input type="hidden" name="current_page" value="/index.asp">\n';
	banner_code +='<input type="hidden" name="next_page" value="/index.asp">\n';
	banner_code +='<input type="hidden" name="action_mode" value="apply">\n';
	banner_code +='<input type="hidden" name="action_script" value="restart_wan_if">\n';
	banner_code +='<input type="hidden" name="action_wait" value="5">\n';
	banner_code +='<input type="hidden" name="wan_enable" value="<% nvram_get("wan_enable"); %>">\n';
	banner_code +='<input type="hidden" name="wan_unit" value="<% get_wan_unit(); %>">\n';
	banner_code +='</form>\n';

	banner_code +='<div class="banner1" align="center"><img src="images/New_ui/asustitle.png" width="218" height="54" align="left">\n';
	banner_code +='<a href="javascript:logout();"><div style="margin-top:13px;margin-left:100px; *width:136px;" class="titlebtn" align="center"><span><#t1Logout#></span></div></a>\n';
	banner_code +='<a href="javascript:reboot();"><div style="margin-top:13px;margin-left:20px;*width:136px;" class="titlebtn" align="center"><span><#BTN_REBOOT#></span></div></a>\n';
	//banner_code +='<span style="color:white"><#PASS_LANG#></span>\n';
	banner_code +='<select name="select_lang" id="select_lang" class="input_option_lang" onchange="submit_language();">\n';
	banner_code +='<% shown_language_option(); %>';
	banner_code +='</select>\n';

	banner_code +='</div>\n';
	banner_code +='<table width="998" border="0" align="center" cellpadding="0" cellspacing="0" class="statusBar" style="margin-top:-3px;">\n';
	banner_code +='<tr>\n';
  banner_code +='<td background="images/New_ui/midup_bg.png" height="179" valign="top"><table width="764" border="0" cellpadding="0" cellspacing="0" height="12px" style="margin-left:230px;">\n';
  banner_code +='<tbody><tr>\n';
 	banner_code +='<td valign="center" class="titledown" width="auto">';
  banner_code +='<span style="font-family:Verdana, Arial, Helvetica, sans-serif;"><#menu5_6_1_title#>:</sapn><a href="/Advanced_OperationMode_Content.asp" style="color:white"><span id="sw_mode_span" class="title_link"></span></a>\n';
  banner_code +='<span style="font-family:Verdana, Arial, Helvetica, sans-serif;"><#General_x_FirmwareVersion_itemname#></sapn><a href="/Advanced_FirmwareUpgrade_Content.asp" style="color:white;"><span id="firmver" class="title_link"></span></a> <small>(Merlin build)</small>\n';
	banner_code +='<span style="font-family:Verdana, Arial, Helvetica, sans-serif;">SSID:</sapn>';
	banner_code +='<span onclick="change_wl_unit_status(0)" id="elliptic_ssid_2g" class="title_link"></span>';
	banner_code +='<span onclick="change_wl_unit_status(1)" id="elliptic_ssid_5g" style="margin-left:-5px;" class="title_link"></span>\n';
  banner_code +='</td>\n';

	if(cooler_support != -1)
  	banner_code +='<td width="30"><div id="cooler_status"" style="display:none;"></div></td>\n';

	if(multissid_support != -1)
  	banner_code +='<td width="30"><div id="guestnetwork_status""></div></td>\n';

	if(sw_mode != 3)
	  banner_code +='<td width="30"><div id="connect_status""></div></td>\n';

	if(usb_support != -1)
  	banner_code +='<td width="30"><div id="usb_status"></div></td>\n';
	
	if(printer_support != -1)
	  banner_code +='<td width="30"><div id="printer_status"></div></td>\n';

  banner_code +='<td width="17"></td>\n';
  banner_code +='</tr></tbody></table></td></tr></table>\n';

	$("TopBanner").innerHTML = banner_code;

	show_loading_obj();	
	show_top_status();
	set_Dr_work();
	updateStatus_AJAX();
}

//Level 3 Tab
var tabtitle = new Array(11);
tabtitle[0] = new Array("", "<#menu5_1_1#>", "<#menu5_1_2#>", "<#menu5_1_3#>", "<#menu5_1_4#>", "<#menu5_1_5#>", "<#menu5_1_6#>");
tabtitle[1] = new Array("", "<#menu5_2_1#>", "<#menu5_2_2#>", "<#menu5_2_3#>", "IPTV", "Switch Control");
tabtitle[2] = new Array("", "<#menu5_3_1#>", "Dual WAN", "<#menu5_3_3#>", "<#menu5_3_4#>", "<#menu5_3_5#>", "<#menu5_3_6#>", "<#NAT_passthrough_itemname#>", "<#menu5_4_4#>");
tabtitle[3] = new Array("", "<#UPnPMediaServer#>", "<#menu5_4_1#>", "<#menu5_4_2#>", "WebDav", "<#menu5_4_3#>");
tabtitle[4] = new Array("", "IPv6");
tabtitle[5] = new Array("", "VPN Server");
tabtitle[6] = new Array("", "<#menu5_5_1#>", "<#menu5_5_2#>", "<#menu5_5_3#>", "<#menu5_5_4#>");
tabtitle[7] = new Array("", "<#menu5_6_1#>", "<#menu5_6_2#>", "<#menu5_6_3#>", "<#menu5_6_4#>", "Performance tuning");
tabtitle[8] = new Array("", "<#menu5_7_2#>", "<#menu5_7_3#>", "<#menu5_7_4#>", "<#menu5_7_5#>", "<#menu5_7_6#>");
tabtitle[9] = new Array("", "QoS", "<#traffic_monitor#>");
tabtitle[10] = new Array("", "WakeOnLAN", "Other Settings");

var tablink = new Array(11);
tablink[0] = new Array("", "Advanced_Wireless_Content.asp", "Advanced_WWPS_Content.asp", "Advanced_WMode_Content.asp", "Advanced_ACL_Content.asp", "Advanced_WSecurity_Content.asp", "Advanced_WAdvanced_Content.asp");
tablink[1] = new Array("", "Advanced_LAN_Content.asp", "Advanced_DHCP_Content.asp", "Advanced_GWStaticRoute_Content.asp", "Advanced_IPTV_Content.asp", "Advanced_SwitchCtrl_Content.asp");
tablink[2] = new Array("", "Advanced_WAN_Content.asp", "Advanced_WANPort_Content.asp", "Advanced_PortTrigger_Content.asp", "Advanced_VirtualServer_Content.asp", "Advanced_Exposed_Content.asp", "Advanced_ASUSDDNS_Content.asp", "Advanced_NATPassThrough_Content.asp", "Advanced_Modem_Content.asp");
tablink[3] = new Array("", "mediaserver.asp", "Advanced_AiDisk_samba.asp", "Advanced_AiDisk_ftp.asp", "Advanced_AiDisk_webdav.asp", "Advanced_AiDisk_others.asp");
tablink[4] = new Array("", "Advanced_IPv6_Content.asp");
tablink[5] = new Array("", "Advanced_PPTP_Content.asp");
tablink[6] = new Array("", "Advanced_BasicFirewall_Content.asp", "Advanced_URLFilter_Content.asp", "Advanced_MACFilter_Content.asp", "Advanced_Firewall_Content.asp");
tablink[7] = new Array("", "Advanced_OperationMode_Content.asp", "Advanced_System_Content.asp", "Advanced_FirmwareUpgrade_Content.asp", "Advanced_SettingBackup_Content.asp", "Advanced_PerformanceTuning_Content.asp");
tablink[8] = new Array("", "Main_LogStatus_Content.asp", "Main_DHCPStatus_Content.asp", "Main_WStatus_Content.asp", "Main_IPTStatus_Content.asp", "Main_RouteStatus_Content.asp");
tablink[9] = new Array("", "QoS_EZQoS.asp", "Main_TrafficMonitor_realtime.asp", "Main_TrafficMonitor_last24.asp", "Main_TrafficMonitor_daily.asp", "Advanced_QOSUserSpec_Content.asp");
tablink[10] = new Array("", "Main_WOL.asp", "Main_OtherSettings.asp");

//Level 2 Menu
menuL2_title = new Array("", "<#menu5_1#>", "<#menu5_2#>", "<#menu5_3#>", "<#menu5_4#>", "IPv6", "VPN server", "<#menu5_5#>", "<#menu5_6#>", "<#menu5_7#>");
menuL2_link  = new Array("", tablink[0][1], tablink[1][1], tablink[2][1], tablink[3][1], tablink[4][1], tablink[5][1], tablink[6][1], tablink[7][1], tablink[8][1]);

//Level 1 Menu
menuL1_title = new Array("", "<#menu1#>", "<#Guest_Network#>", "<#Menu_TrafficManager#>", "<#Parental_Control#>", "<#Menu_usb_application#>", "Home Cloud", "Tools","<#menu5#>");
menuL1_link = new Array("", "index.asp", "Guest_network.asp", "QoS_EZQoS.asp", "ParentalControl.asp", "APP_Installation.asp", "cloud.asp", tablink[10][1],"");

var rc_support = "<% nvram_get("rc_support"); %>"; 
var wl_vifnames = "<% nvram_get("wl0_vifnames"); %>";
var traffic_L1_dx = 3;
var traffic_L2_dx = 10;

var band2g_support = rc_support.search("2.4G");
var band5g_support = rc_support.search("5G");
var live_update_support = rc_support.search("update"); 
var cooler_support = rc_support.search("fanctrl"); 
var power_support = rc_support.search("pwrctrl"); 
var dbwww_support = rc_support.search("dbwww"); 
var repeater_support = rc_support.search("repeater"); 
var Rawifi_support = rc_support.search("rawifi");
var SwitchCtrl_support = rc_support.search("switchctrl");

var multissid_support = rc_support.search("mssid"); 
if(sw_mode == 2)
	multissid_support = -1;
if(multissid_support != -1)
	multissid_support = wl_vifnames.split(" ").length;

var nat_support = <% nvram_get("wan_nat_x"); %>;
var usb_support = rc_support.search("usb"); 
var printer_support = rc_support.search("printer"); 
var appbase_support = rc_support.search("appbase");
var appnet_support = rc_support.search("appnet");
var media_support = rc_support.search("media");
var cloudsync_support = rc_support.search("cloudsync");
var modem_support = rc_support.search("modem"); 
var IPv6_support = rc_support.search("ipv6"); 
var ParentalCtrl_support = rc_support.search("PARENTAL"); 
var pptpd_support = rc_support.search("pptpd"); 
var openvpnd_support = rc_support.search("openvpnd"); 
var dualWAN_support = rc_support.search("dualwan"); 
var WebDav_support = rc_support.search("webdav"); 
var HTTPS_support = rc_support.search("HTTPS"); 
var DSL_support = rc_support.search("DSL"); 
var calculate_height = menuL1_link.length+tablink.length-3;

function remove_url(){
	remove_menu_item(2, "Advanced_Modem_Content.asp");
		
	if(sw_mode == 2){
		// Parental Ctrl
		menuL1_title[4] ="";
		menuL1_link[4] ="";
		// Guest Network
		menuL1_title[3] ="";
		menuL1_link[3] ="";
		// Traffic Manager
		menuL1_title[2] ="";
		menuL1_link[2] ="";
		// Wireless
		remove_menu_item(0, "Advanced_WWPS_Content.asp");
		// WAN
		menuL2_title[3]="";
		menuL2_link[3]="";	
		// LAN
		remove_menu_item(1, "Advanced_DHCP_Content.asp");
		remove_menu_item(1, "Advanced_GWStaticRoute_Content.asp");
		remove_menu_item(1, "Advanced_IPTV_Content.asp");								
		remove_menu_item(1, "Advanced_SwitchCtrl_Content.asp");
		// VPN
		menuL2_title[5]="";
		menuL2_link[5]="";
		//IPv6
		menuL2_title[6]="";
		menuL2_link[6]="";
		// Firewall		
		menuL2_title[7]="";
		menuL2_link[7]="";
		// Log
		remove_menu_item(8, "Main_DHCPStatus_Content.asp");
		remove_menu_item(8, "Main_IPTStatus_Content.asp");
		remove_menu_item(8, "Main_RouteStatus_Content.asp");								
	}
	else if(sw_mode == 3){
		// Parental Ctrl
		menuL1_title[4] ="";
		menuL1_link[4] ="";
		// Traffic Manager
		menuL1_title[3] ="";
		menuL1_link[3] ="";
		// Wireless
		remove_menu_item(0, "Advanced_WWPS_Content.asp");
		// WAN
		menuL2_title[3]="";
		menuL2_link[3]="";
		// LAN
		remove_menu_item(1, "Advanced_DHCP_Content.asp");
		remove_menu_item(1, "Advanced_GWStaticRoute_Content.asp");
		remove_menu_item(1, "Advanced_IPTV_Content.asp");
		remove_menu_item(1, "Advanced_SwitchCtrl_Content.asp");
		// VPN
		menuL2_title[5]="";
		menuL2_link[5]="";
		// IPv6
		menuL2_title[6]="";
		menuL2_link[6]="";
		// Firewall		
		menuL2_title[7]="";
		menuL2_link[7]="";
		// Log
		remove_menu_item(8, "Main_DHCPStatus_Content.asp");
		remove_menu_item(8, "Main_IPTStatus_Content.asp");
		remove_menu_item(8, "Main_RouteStatus_Content.asp");								
	}
	
	if(dualWAN_support == -1){
		remove_menu_item(2, "Advanced_WANPort_Content.asp");
	}

	if(media_support == -1){
		tabtitle[3].splice(1, 1);
		tablink[3].splice(1, 1);	
	}

	if(cooler_support == -1){
		remove_menu_item(7, "Advanced_PerformanceTuning_Content.asp");
	}

	if(WebDav_support == -1){
		menuL1_title[6]="";
		menuL1_link[6]="";
		remove_menu_item(3, "Advanced_AiDisk_webdav.asp");
	}

	if(ParentalCtrl_support == -1){
		if(sw_mode == 3){
			menuL1_title[4]="";
			menuL1_link[4]="";
		}
	}
	else
		remove_menu_item(6, "Advanced_MACFilter_Content.asp");

	if(nat_support == -1){ // ifdef nat_support
		remove_menu_item(2, "Advanced_PortTrigger_Content.asp");
		remove_menu_item(2, "Advanced_VirtualServer_Content.asp");
		remove_menu_item(2, "Advanced_Exposed_Content.asp");
		remove_menu_item(8, "Main_IPTStatus_Content.asp");
	}

	if(IPv6_support == -1){
		menuL2_title[5] = "";
		menuL2_link[5] = "";
	}
	
	if(multissid_support == -1){
		menuL1_title[2]="";
		menuL1_link[2]="";
	}

	if(usb_support == -1){
		menuL1_title[5]="";
		menuL1_link[5]="";
	}

	if(pptpd_support == -1){
		remove_menu_item(5, "Advanced_PPTP_Content.asp");
		if(openvpnd_support == -1){
			menuL2_title[6] = "";
			menuL2_link[6] = "";
		}
	}	
	
	if(SwitchCtrl_support == -1){
		remove_menu_item(1, "Advanced_SwitchCtrl_Content.asp");		
	}
}

function remove_menu_item(L2, remove_url){
	var dx;
	for(var i = 0; i < tablink[L2].length; i++){
		dx = tablink[L2].getIndexByValue(remove_url);
		if(dx == -1)				//If not match, pass it
				return false;
		else if(dx == 1)		//If removed url is the 1st tablink then replace by next tablink 
				menuL2_link.splice(L2+1, 1, tablink[L2][2]);
		else{
				tabtitle[L2].splice(dx, 1);
				tablink[L2].splice(dx, 1);
				break;
		}
	}
}

Array.prototype.getIndexByValue= function(value){
	var index = -1;
	for (var i = 0; i < this.length; i++){
		if (this[i] == value){
			index = i;
			break;
		}
	}
	return index;
}

var current_url = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
function show_menu(){
	var L1 = 0, L2 = 0, L3 = 0;
	if(current_url == "") current_url = "index.asp";

	remove_url();
	for(var i = 1; i < menuL1_link.length; i++){
		if(current_url == menuL1_link[i]){
			L1 = i;
			break;
		}
		else
			L1 = menuL1_link.length;
	}
	if(L1 == menuL1_link.length){
		for(var j = 0; j < tablink.length; j++){
			for(var k = 1; k < tablink[j].length; k++){
				if(current_url == tablink[j][k]){
					L2 = j+1;
					L3 = k;
					break;
				}
			}
		}
	}

	// special case for Traffic Manager and Tools
	if(L1 == traffic_L1_dx || L2 == traffic_L2_dx || L1 == 7){
		if(current_url.indexOf("Main_TrafficMonitor_") == 0){
			L1 = traffic_L1_dx; 
			L2 = traffic_L2_dx; 
			L3 = 2;
		}
		else if(current_url.indexOf("ParentalControl") == 0){
			L1 = traffic_L1_dx; 
			L2 = traffic_L2_dx; 
			L3 = 3;
		}
                else if(current_url.indexOf("Main_WOL") == 0){
                        L1 = 9;
                        L2 = 11;
                        L3 = 1;
                }

		else{
			L1 = traffic_L1_dx; 
			L2 = traffic_L2_dx; 
			L3 = 1;
		}
	}
	//end
//document.write(L1);
//document.write(L2);
//document.write(L3);

	show_banner(L3);
	show_footer();
	browser_compatibility();	
	
	if(sw_mode == 2)
		menu1_code += '<div class="m_qis_r" style="margin-top:-170px;cursor:pointer;" onclick="go_setting(\'QIS_wizard.htm?flag=sitesurvey\');"><table><tr><td><img width="50px" height="50px" style="margin-left:10px;" border="0" src="images/New_ui/setupwizard_icon.png"/></td><td><div><#QIS#></div></td></tr></table></div>\n';
	else if(sw_mode == 3)
		menu1_code += '<div class="m_qis_r" style="margin-top:-170px;cursor:pointer;" onclick="go_setting(\'QIS_wizard.htm?flag=lanip\');"><table><tr><td><img width="50px" height="50px" style="margin-left:10px;" border="0" src="images/New_ui/setupwizard_icon.png"/></td><td><div><#QIS#></div></td></tr></table></div>\n'; 	
	else 
		menu1_code += '<div class="m_qis_r" style="margin-top:-170px;cursor:pointer;" onclick="go_setting(\'QIS_wizard.htm\');"><table><tr><td><img width="50px" height="50px" style="margin-left:10px;" border="0" src="images/New_ui/setupwizard_icon.png"/></td><td><div><#QIS#></div></td></tr></table></div>\n'; 	
	// General
	menu1_code += '<div class="m0_r" style="margin-top:10px;" id="option0"><table width="192px" height="37px"><tr><td><#menu5_5_1#></td></tr></table></div>\n';
	for(i = 1; i <= menuL1_title.length-2; i++){
		if(menuL1_title[i] == ""){
			calculate_height--;
			continue;
		}
		else if(L1 == i && (L2 <= 0 || L2 == traffic_L2_dx)){
                  menu1_code += '<div class="m'+i+'_r" id="option'+i+'">'+'<table><tr><td><img border="0" width="50px" height="50px" src="images/New_ui/icon_index_'+i+'.png" style="margin-top:-3px;"/></td><td><div style="width:120px;">'+menuL1_title[i]+'</div></td></tr></table></div>\n';
		}
		else{

		  //menu1_code += '<div class="menu" id="option'+i+'"><a href="'+menuL1_link[i]+'">'+'<table><tr><td><img border="0" width="50px" height="50px" src="images/New_ui/icon_index_'+i+'.png" style="margin-top:-3px;"/></td><td><div style="width:120px;">'+menuL1_title[i]+'</div></td></tr></table></a></div>\n';	
                  menu1_code += '<div class="menu" id="option'+i+'" onclick="location.href=\''+menuL1_link[i]+'\'"                  style="cursor:pointer;"><table><tr><td><img border="0" width="50px" height="50px" src="images/New_ui/icon_index_'+i+'.png" style="margin-top:-3px;"/></td><td><div style="width:120px;">'+menuL1_title[i]+'</div></td></tr></table></div>\n';

		}
	}
	menu1_code += '<div class="m0_r" style="margin-top:10px;" id="option0">'+'<table width="192px" height="37px"><tr><td><#menu5_title#></td></tr></table></div>\n'; 	
	$("mainMenu").innerHTML = menu1_code;

	// Advanced
	if(L2 != -1){ 
		for(var i = 1; i < menuL2_title.length; ++i){
			if(menuL2_link[i] == "Advanced_Wireless_Content.asp" && "<% nvram_get("wl_subunit"); %>" != "0" && "<% nvram_get("wl_subunit"); %>" != "-1")
				menuL2_link[i] = "javascript:change_wl_unit_status(" + <% nvram_get("wl_unit"); %> + ");";
			if(menuL2_title[i] == "" || i == 4){
				calculate_height--;
				continue;
			}
			else if(L2 == i)
				menu2_code += '<div class="m1_r" id="option1">'+'<table><tr><td><img border="0" width="50px" height="50px" src="images/New_ui/icon_menu_'+i+'.png" style="margin-top:-3px;"/></td><td><div style="width:120px;">'+menuL2_title[i]+'</div></td></tr></table></div>\n';
			else
				menu2_code += '<div class="menu" id="option1" onclick="location.href=\''+menuL2_link[i]+'\'" style="cursor:pointer;"><table><tr><td><img border="0" width="50px" height="50px" src="images/New_ui/icon_menu_'+i+'.png" style="margin-top:-3px;"/></td><td><div style="width:120px;">'+menuL2_title[i]+'</div></td></tr></table></div>\n';
		}
	}
	$("subMenu").innerHTML = menu2_code;

	// Tabs
	if(L3){
		if(L2 == traffic_L2_dx){ // if tm
			tab_code = '<table border="0" cellspacing="0" cellpadding="0"><tr>\n';
			for(var i=1; i < tabtitle[traffic_L2_dx-1].length; ++i){
				if(tabtitle[traffic_L2_dx-1][i] == "")
					continue;
				else if(L3 == i)
					tab_code += '<td><div class="tabclick"><span>'+ tabtitle[traffic_L2_dx-1][i] +'</span></div></td>';
				else
					tab_code += '<td><a href="' + tablink[traffic_L2_dx-1][i] + '"><div class="tab"><span>'+ tabtitle[traffic_L2_dx-1][i] +'</span></div></a></td>';
			}
			tab_code += '</tr></table>\n';		
		}
		else{
			tab_code = '<table border="0" cellspacing="0" cellpadding="0"><tr>\n';
			for(var i=1; i < tabtitle[L2-1].length; ++i){
				if(tabtitle[L2-1][i] == "")
					continue;
				else if(L3 == i)
					tab_code += '<td><div class="tabclick"><span>'+tabtitle[L2-1][i]+'</span></div></td>';
				else
					tab_code += '<td><a href="'+tablink[L2-1][i]+'"><div class="tab"><span>'+tabtitle[L2-1][i]+'</span></div></a></td>';
			}
			tab_code += '</tr></table>\n';		
		}

		$("tabMenu").innerHTML = tab_code;
	}
	cal_height();
}

function addOnlineHelp(keywordArray){
	if($("faq")){
		$("faq").href = "http://support.asus.com/search.aspx?SLanguage=";
		$("faq").href += ('<% nvram_get("preferred_lang"); %>' == 'TW') ? "zh-tw" : "en";
		$("faq").href += "&keyword=";
		for(var i=0; i<keywordArray.length; i++){
			$("faq").href += keywordArray[i];
			$("faq").href += "%20";
		}
	}
}

function cal_height(){
	var table_height = 52*calculate_height+80; // index.asp

	if($("FormTitle") && current_url.indexOf("Advanced_AiDisk_ftp") != 0 && current_url.indexOf("Advanced_AiDisk_samba") != 0 && current_url.indexOf("Advanced_AiDisk_webdav") != 0){
		var table_height_table = table_height-10;

		if(!current_url.indexOf("ParentalControl") || !current_url.indexOf("Advanced_Modem_Content"))
			table_height_table = table_height_table + 40;

		$("FormTitle").style.height = table_height_table + "px";
	}

	if($("qos_table")){
		var table_height_table = table_height-30;
		$("qos_table").style.height = table_height_table + "px";
	}

	if($("table_height"))
		$("table_height").style.height = table_height + 20 + "px";

	if($("sub_frame"))
		$("sub_frame").style.height = table_height + 30 + "px";

	if(table_height < 670)
		table_height = 670;

	if($("NM_table"))
		$("NM_table").style.height = table_height + "px";

	if($("_NM_table"))
		$("_NM_table").style.marginTop = Math.round((table_height-675)/3) + "px";
}

function show_footer(){
	footer_code = '<div align="center" class="bottom-image"></div>\n';
	if(dbwww_support != -1)
		footer_code +='<div align="center" class="copyright">httpd_dir='+httpd_dir+'</div>\n';
	else
		footer_code +='<div align="center" class="copyright"><#footer_copyright_desc#></div>\n';
	$("footer").innerHTML = footer_code;
	flash_button();
}

function browser_compatibility(){
	var isFirefox = navigator.userAgent.search("Firefox") > -1;
	var isOpera = navigator.userAgent.search("Opera") > -1;
	var isIE8 = navigator.userAgent.search("MSIE 8") > -1; 
	var isiOS = navigator.userAgent.search("iP") > -1; 
	var obj_inputBtn;

	if((isFirefox || isOpera) && document.getElementById("FormTitle")){
		document.getElementById("FormTitle").className = "FormTitle_firefox";
		if(current_url.indexOf("ParentalControl") == 0 || current_url.indexOf("Guest_network") == 0)
			document.getElementById("FormTitle").style.marginTop = "-140px";
	}

	if(isiOS){
		obj_inputBtn = document.getElementsByClassName("button_gen");
		for(var i=0; i<obj_inputBtn.length; i++){
			obj_inputBtn[i].addEventListener('touchstart', function(){this.className = 'button_gen_touch';}, false);
			obj_inputBtn[i].addEventListener('touchend', function(){this.className = 'button_gen';}, false);
		}
		obj_inputBtn = document.getElementsByClassName("button_gen_long");
		for(var i=0; i<obj_inputBtn.length; i++){
			obj_inputBtn[i].addEventListener('touchstart', function(){this.className = 'button_gen_long_touch';}, false);
			obj_inputBtn[i].addEventListener('touchend', function(){this.className = 'button_gen_long';}, false);
		}
	}
}	

function show_top_status(){
	var ssid_status_2g =  decodeURIComponent('<% nvram_char_to_ascii("WLANConfig11b", "wl0_ssid"); %>');
	var ssid_status_5g =  decodeURIComponent('<% nvram_char_to_ascii("WLANConfig11b", "wl1_ssid"); %>');
	if(sw_mode == 2){
		if('<% nvram_get("wlc_band"); %>' == '0')
			ssid_status_2g =  decodeURIComponent('<% nvram_char_to_ascii("WLANConfig11b", "wl0.1_ssid"); %>');
		else
			ssid_status_5g =  decodeURIComponent('<% nvram_char_to_ascii("WLANConfig11b", "wl1.1_ssid"); %>');
	}
	
	if(band5g_support == -1){
		ssid_status_5g = "";
		if(ssid_status_2g.length > 23){
			ssid_status_2g = ssid_status_2g.substring(0,20) + "...";
			$("elliptic_ssid_2g").onmouseover = function(){
				if(sw_mode == 2 && '<% nvram_get("wlc_band"); %>' == 0)
					return overlib('<p style="font-weight:bold;">2.4GHz SSID:</p>'+decodeURIComponent('<% nvram_char_to_ascii("WLANConfig11b", "wlc_ure_ssid"); %>'));
				else
					return overlib('<p style="font-weight:bold;">2.4GHz SSID:</p>'+decodeURIComponent('<% nvram_char_to_ascii("WLANConfig11b", "wl0_ssid"); %>'));
			};
			$("elliptic_ssid_2g").onmouseout = function(){
				nd();
			};
		}
	}
	else{
		if(ssid_status_2g.length > 12){
			ssid_status_2g = ssid_status_2g.substring(0,10) + "...";
			$("elliptic_ssid_2g").onmouseover = function(){
				if(sw_mode == 2 && '<% nvram_get("wlc_band"); %>' == 0)
					return overlib('<p style="font-weight:bold;">2.4GHz SSID:</p>'+decodeURIComponent('<% nvram_char_to_ascii("WLANConfig11b", "wlc_ure_ssid"); %>'));
				else
					return overlib('<p style="font-weight:bold;">2.4GHz SSID:</p>'+decodeURIComponent('<% nvram_char_to_ascii("WLANConfig11b", "wl0_ssid"); %>'));
			};
			$("elliptic_ssid_2g").onmouseout = function(){
				nd();
			};
		}
	
		if(ssid_status_5g.length > 12){
			ssid_status_5g = ssid_status_5g.substring(0,10) + "...";
			$("elliptic_ssid_5g").onmouseover = function(){
				if(sw_mode == 2 && '<% nvram_get("wlc_band"); %>' == 1)
					return overlib('<p style="font-weight:bold;">5GHz SSID:</p>'+decodeURIComponent('<% nvram_char_to_ascii("WLANConfig11b", "wlc_ure_ssid"); %>'));
				else
					return overlib('<p style="font-weight:bold;">5GHz SSID:</p>'+decodeURIComponent('<% nvram_char_to_ascii("WLANConfig11b", "wl1_ssid"); %>'));
			};
			$("elliptic_ssid_5g").onmouseout = function(){
				nd();
			};
		}
	}

	$("elliptic_ssid_2g").innerHTML = ssid_status_2g;
	$("elliptic_ssid_5g").innerHTML = ssid_status_5g;	

	showtext($("firmver"), document.form.firmver.value + "." + <% nvram_get("buildno"); %>);
	
	if(sw_mode == "1")  // Show operation mode in banner, Viz 2011.11
		$("sw_mode_span").innerHTML = "<#wireless_router#>";
	else if(sw_mode == "2")
		$("sw_mode_span").innerHTML = "<#OP_RE_item#>";
	else if(sw_mode == "3")
		$("sw_mode_span").innerHTML = "<#OP_AP_item#>";
	else
		$("sw_mode_span").innerHTML = "Unknown";	
}

function go_setting(page){
		location.href = page;
}

function go_setting_parent(page){
		parent.location.href = page;
}

function show_time(){	
	JS_timeObj.setTime(systime_millsec); // Add millsec to it.	
	JS_timeObj3 = JS_timeObj.toString();	
	JS_timeObj3 = checkTime(JS_timeObj.getHours()) + ":" +
				  			checkTime(JS_timeObj.getMinutes()) + ":" +
				  			checkTime(JS_timeObj.getSeconds());
	$('systemtime').innerHTML ="<a href='/Advanced_System_Content.asp'>" + JS_timeObj3 + "</a>";
	systime_millsec += 1000;		
	
	stime_ID = setTimeout("show_time();", 1000);
}

function checkTime(i)
{
if (i<10) 
  {i="0" + i}
  return i
}

function show_loading_obj(){
	var obj = $("Loading");
	var code = "";
	
	code +='<table cellpadding="5" cellspacing="0" id="loadingBlock" class="loadingBlock" align="center">\n';
	code +='<tr>\n';
	code +='<td width="20%" height="80" align="center"><img src="/images/loading.gif"></td>\n';
	code +='<td><span id="proceeding_main_txt"><#Main_alert_proceeding_desc4#></span><span id="proceeding_txt" style="color:#FFFFCC;"></span></td>\n';
	code +='</tr>\n';
	code +='</table>\n';
	code +='<!--[if lte IE 6.5]><iframe class="hackiframe"></iframe><![endif]-->\n';
	
	obj.innerHTML = code;
}

var nav;

if(navigator.appName == 'Netscape')
	nav = true;
else{
	nav = false;
	document.onkeydown = MicrosoftEventHandler_KeyDown;
}

function MicrosoftEventHandler_KeyDown(){
	return true;
}

function submit_language(){
	if($("select_lang").value != $("preferred_lang").value){
		showLoading();
		
		with(document.titleForm){
			action = "/start_apply.htm";
			
			if(location.pathname == "/")
				current_page.value = "/index.asp";
			else
				current_page.value = location.pathname;
			
			preferred_lang.value = $("select_lang").value;
			flag.value = "set_language";
			
			submit();
		}
	}
	else
		alert("No change LANGUAGE!");
}

function change_language(){
	if($("select_lang").value != $("preferred_lang").value)
		$("change_lang_btn").disabled = false;
	else
		$("change_lang_btn").disabled = true;
}

function logout(){
	if(confirm('<#JS_logout#>')){
		setTimeout('location = "Logout.asp";', 1);
	}
}

function reboot(){
	if(confirm("<#Main_content_Login_Item7#>")){				
		if(document.form.current_page){
			if(document.form.current_page.value.indexOf("Advanced_FirmwareUpgrade_Content")>=0
		  	 || document.form.current_page.value.indexOf("Advanced_SettingBackup_Content")>=0)
					document.form.enctype = "";
		}		
		FormActions("apply.cgi", "reboot", "", "30");
		document.form.submit();
	}
}

function kb_to_gb(kilobytes){
	if(typeof(kilobytes) == "string" && kilobytes.length == 0)
		return 0;
	
	return (kilobytes*1024)/(1024*1024*1024);
}

function simpleNum(num){
	if(typeof(num) == "string" && num.length == 0)
		return 0;
	
	return parseInt(kb_to_gb(num)*1000)/1000;
}

function simpleNum2(num){
	if(typeof(num) == "string" && num.length == 0)
		return 0;
	
	return parseInt(num*1000)/1000;
}

function simpleNum3(num){
	if(typeof(num) == "string" && num.length == 0)
		return 0;
	
	return parseInt(num)/1024;
}

function $(){
	var elements = new Array();
	
	for(var i = 0; i < arguments.length; ++i){
		var element = arguments[i];
		if(typeof element == 'string')
			element = document.getElementById(element);
		
		if(arguments.length == 1)
			return element;
		
		elements.push(element);
	}
	
	return elements;
}

function getElementsByName_iefix(tag, name){
	var tagObjs = document.getElementsByTagName(tag);
	var objsName;
	var targetObjs = new Array();
	var targetObjs_length;
	
	if(!(typeof(name) == "string" && name.length > 0))
		return [];
	
	for(var i = 0, targetObjs_length = 0; i < tagObjs.length; ++i){
		objsName = tagObjs[i].getAttribute("name");
		
		if(objsName && objsName.indexOf(name) == 0){
			targetObjs[targetObjs_length] = tagObjs[i];
			++targetObjs_length;
		}
	}
	
	return targetObjs;
}

function getElementsByClassName_iefix(tag, name){
	var tagObjs = document.getElementsByTagName(tag);
	var objsName;
	var targetObjs = new Array();
	var targetObjs_length;
	
	if(!(typeof(name) == "string" && name.length > 0))
		return [];
	
	for(var i = 0, targetObjs_length = 0; i < tagObjs.length; ++i){
		if(navigator.appName == 'Netscape')
			objsName = tagObjs[i].getAttribute("class");
		else
			objsName = tagObjs[i].getAttribute("className");
		
		if(objsName == name){
			targetObjs[targetObjs_length] = tagObjs[i];
			++targetObjs_length;
		}
	}
	
	return targetObjs;
}

function showtext(obj, str){
	if(obj)
		obj.innerHTML = str;//*/
}

function showhtmlspace(ori_str){
	var str = "", head, tail_num;
	
	head = ori_str;
	while((tail_num = head.indexOf(" ")) >= 0){
		str += head.substring(0, tail_num);
		str += "&nbsp;";
		
		head = head.substr(tail_num+1, head.length-(tail_num+1));
	}
	str += head;
	
	return str;
}

function showhtmland(ori_str){
	var str = "", head, tail_num;
	
	head = ori_str;
	while((tail_num = head.indexOf("&")) >= 0){
		str += head.substring(0, tail_num);
		str += "&amp;";
		
		head = head.substr(tail_num+1, head.length-(tail_num+1));
	}
	str += head;
	
	return str;
}

// A dummy function which just returns its argument. This was needed for localization purpose
function translate(str){
	return str;
}

function trim(val){
	val = val+'';
	for (var startIndex=0;startIndex<val.length && val.substring(startIndex,startIndex+1) == ' ';startIndex++);
	for (var endIndex=val.length-1; endIndex>startIndex && val.substring(endIndex,endIndex+1) == ' ';endIndex--);
	return val.substring(startIndex,endIndex+1);
}

function IEKey(){
	return event.keyCode;
}

function NSKey(){
	return event.which;
}

function is_string(o, event){
	keyPressed = event.keyCode ? event.keyCode : event.which;

	if(keyPressed == 0)
		return true;
	else if(keyPressed >= 0 && keyPressed <= 126)
		return true;
	
	alert('<#JS_validchar#>');
	return false;
}

function validate_string(string_obj, flag){
	if(string_obj.value.charAt(0) == '"'){
		if(flag != "noalert")
			alert('<#JS_validstr1#> ["]');
		
		string_obj.value = "";
		string_obj.focus();
		
		return false;
	}
	else{
		invalid_char = "";
		
		for(var i = 0; i < string_obj.value.length; ++i){
			if(string_obj.value.charAt(i) < ' ' || string_obj.value.charAt(i) > '~'){
				invalid_char = invalid_char+string_obj.value.charAt(i);
			}
		}
		
		if(invalid_char != ""){
			if(flag != "noalert")
				alert("<#JS_validstr2#> '"+invalid_char+"' !");
			string_obj.value = "";
			string_obj.focus();
			
			return false;
		}
	}
	
	return true;
}

function validate_hex(obj){
	var obj_value = obj.value
	var re = new RegExp("[^a-fA-F0-9]+","gi");
	
	if(re.test(obj_value))
		return false;
	else
		return true;
}

function validate_psk(psk_obj){
	var psk_length = psk_obj.value.length;
	
	if(psk_length < 8){
		alert("<#JS_passzero#>");
		psk_obj.value = "00000000";
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length > 64){
		alert("<#JS_passzero#>");
		psk_obj.value = "00000000";
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length >= 8 && psk_length <= 63 && !validate_string(psk_obj)){
		alert("<#JS_PSK64Hex#>");
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length == 64 && !validate_hex(psk_obj)){
		alert("<#JS_PSK64Hex#>");
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	return true;
}

function validate_wlkey(key_obj){

	var wep_type = document.form.wl_wep_x.value;
	var iscurrect = true;
	var str = "<#JS_wepkey#>";

	if(wep_type == "0")
		iscurrect = true;	// do nothing
	else if(wep_type == "1"){
		if(key_obj.value.length == 5 && validate_string(key_obj)){
			document.form.wl_key_type.value = 1; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else if(key_obj.value.length == 10 && validate_hex(key_obj)){
			document.form.wl_key_type.value = 0; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else{
			str += "(<#WLANConfig11b_WEPKey_itemtype1#>)";
			
			iscurrect = false;
		}
	}
	else if(wep_type == "2"){
		if(key_obj.value.length == 13 && validate_string(key_obj)){
			document.form.wl_key_type.value = 1; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else if(key_obj.value.length == 26 && validate_hex(key_obj)){
			document.form.wl_key_type.value = 0; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else{
			str += "(<#WLANConfig11b_WEPKey_itemtype2#>)";
			
			iscurrect = false;
		}
	}
	else{
		alert("System error!");
		iscurrect = false;
	}
	
	if(iscurrect == false){
		alert(str);
		
		key_obj.focus();
		key_obj.select();
	}
	
	return iscurrect;
}

function checkDuplicateName(newname, targetArray){
	var existing_string = targetArray.join(',');
	existing_string = ","+existing_string+",";
	var newstr = ","+trim(newname)+",";
	
	var re = new RegExp(newstr, "gi");
	var matchArray = existing_string.match(re);
	
	if(matchArray != null)
		return true;
	else
		return false;
}

function alert_error_msg(error_msg){
	alert(error_msg);
	refreshpage();
}

function refreshpage(seconds){
	if(typeof(seconds) == "number")
		setTimeout("refreshpage()", seconds*1000);
	else
		location.href = location.href;
}

function hideLinkTag(){
	if(document.all){
		var tagObjs = document.all.tags("a");
		
		for(var i = 0; i < tagObjs.length; ++i)
			tagObjs(i).outerHTML = tagObjs(i).outerHTML.replace(">"," hidefocus=true>");
	}
}

function buttonOver(o){	//Lockchou 1206 modified
	o.style.color = "#FFFFFF";
	o.style.background = "url(/images/bgaibutton.gif) #ACCCE1";
	o.style.cursor = "hand";
}

function buttonOut(o){	//Lockchou 1206 modified
	o.style.color = "#000000";
	o.style.background = "url(/images/bgaibutton0.gif) #ACCCE1";
}

function flash_button(){
	if(navigator.appName.indexOf("Microsoft") < 0)
		return;
	
	var btnObj = getElementsByClassName_iefix("input", "button");
	
	for(var i = 0; i < btnObj.length; ++i){
		btnObj[i].onmouseover = function(){
				buttonOver(this);
			};
		
		btnObj[i].onmouseout = function(){
				buttonOut(this);
			};
	}
}

function no_flash_button(){
	if(navigator.appName.indexOf("Microsoft") < 0)
		return;
	
	var btnObj = getElementsByClassName_iefix("input", "button");
	
	for(var i = 0; i < btnObj.length; ++i){
		btnObj[i].onmouseover = "";
		
		btnObj[i].onmouseout = "";
	}
}

function gotoprev(formObj){
	var prev_page = formObj.prev_page.value;
	
	if(prev_page == "/")
		prev_page = "/index.asp";
	
	if(prev_page.indexOf('QIS') < 0){
		formObj.action = prev_page;
		formObj.target = "_parent";
		formObj.submit();
	}
	else{
		formObj.action = prev_page;
		formObj.target = "";
		formObj.submit();
	}
}

function add_option(selectObj, str, value, selected){
	var tail = selectObj.options.length;
	
	if(typeof(str) != "undefined")
		selectObj.options[tail] = new Option(str);
	else
		selectObj.options[tail] = new Option();
	
	if(typeof(value) != "undefined")
		selectObj.options[tail].value = value;
	else
		selectObj.options[tail].value = "";
	
	if(selected == 1)
		selectObj.options[tail].selected = selected;
}

function free_options(selectObj){
	if(selectObj == null)
		return;
	
	for(var i = selectObj.options.length-1; i >= 0; --i){
  		selectObj.options[i].value = null;
		selectObj.options[i] = null;
	}
}

function blocking(obj_id, show){
	var state = show?'block':'none';
	
	if(document.getElementById)
		$(obj_id).style.display = state;
	else if(document.layers)
		document.layers[obj_id].display = state;
	else if(document.all)
		document.all[obj_id].style.display = state;
}

function inputCtrl(obj, flag){
	if(flag == 0){
		obj.disabled = true;
		if(obj.type != "select-one")
			obj.style.backgroundColor = "#CCCCCC";
		if(obj.type == "radio" || obj.type == "checkbox")
			obj.style.backgroundColor = "#475A5F";
		if(obj.type == "text" || obj.type == "password")
			obj.style.backgroundImage = "url(/images/New_ui/inputbg_disable.png)";
	}
	else{
		obj.disabled = false;
		if(obj.type != "select-one")	
			obj.style.backgroundColor = "#FFF";
		if(obj.type == "radio" || obj.type == "checkbox")
			obj.style.backgroundColor = "#475A5F";
		if(obj.type == "text" || obj.type == "password")
			obj.style.backgroundImage = "url(/images/New_ui/inputbg.png)";
	}

	if(current_url.indexOf("Advanced_Wireless_Content") == 0
	|| current_url.indexOf("Advanced_WAN_Content") == 0
	|| current_url.indexOf("Guest_network") == 0
	|| current_url.indexOf("Advanced_PerformanceTuning_Content") == 0
	|| current_url.indexOf("Advanced_Modem_Content") == 0
	|| current_url.indexOf("Advanced_IPv6_Content") == 0
	|| current_url.indexOf("Advanced_WAdvanced_Content") == 0
	|| current_url.indexOf("Advanced_IPTV_Content") == 0)
	{
		if(obj.type == "checkbox")
			return true;
		if(flag == 0)
			obj.parentNode.parentNode.style.display = "none";
		else
			obj.parentNode.parentNode.style.display = "";
		return true;
	}
}

function inputHideCtrl(obj, flag){
	if(obj.type == "checkbox")
		return true;
	if(flag == 0)
		obj.parentNode.parentNode.style.display = "none";
	else
		obj.parentNode.parentNode.style.display = "";
	return true;
}

//Update current status via AJAX
var http_request_status = false;

function makeRequest_status(url) {
	http_request_status = new XMLHttpRequest();
	if (http_request_status && http_request_status.overrideMimeType)
		http_request_status.overrideMimeType('text/xml');
	else
		return false;

	http_request_status.onreadystatechange = alertContents_status;
	http_request_status.open('GET', url, true);
	http_request_status.send(null);
}

var xmlDoc_ie;

function makeRequest_status_ie(file)
{
	xmlDoc_ie = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc_ie.async = false;
	if (xmlDoc_ie.readyState==4)
	{
		xmlDoc_ie.load(file);
		setTimeout("refresh_info_status(xmlDoc_ie);", 1000);
	}
}

function alertContents_status()
{
	if (http_request_status != null && http_request_status.readyState != null && http_request_status.readyState == 4)
	{
		if (http_request_status.status != null && http_request_status.status == 200)
		{
			var xmldoc_mz = http_request_status.responseXML;
			refresh_info_status(xmldoc_mz);
		}
	}
}

function updateStatus_AJAX()
{
	//alert("AJAX XMLHttp Request sent!");
	var ie = window.ActiveXObject;

	if(ie)
		makeRequest_status_ie('/ajax_status.asp');
	else
		makeRequest_status('/ajax_status.asp');
}

function updateUSBStatus(){
	if(current_url == "index.asp" || current_url == "")
		detectUSBStatusIndex();
	else
		detectUSBStatus();
}

function detectUSBStatus(){
	$j.ajax({
    		url: '/detect_firmware.asp',
    		dataType: 'script',
    		error: function(xhr){
    			detectUSBStatus();
    		},
    		success: function(){
					return true;
  			}
  });
}

var link_status;
var link_auxstatus;
var link_sbstatus;
var usb_path1;
var usb_path2;
var usb_path1_tmp = "init";
var usb_path2_tmp = "init";

function refresh_info_status(xmldoc)
{
	var devicemapXML = xmldoc.getElementsByTagName("devicemap");
	var wanStatus = devicemapXML[0].getElementsByTagName("wan");

	link_status = wanStatus[0].firstChild.nodeValue;
	link_sbstatus = wanStatus[1].firstChild.nodeValue;
	link_auxstatus = wanStatus[2].firstChild.nodeValue;
	usb_path1 = wanStatus[3].firstChild.nodeValue;
	usb_path2 = wanStatus[4].firstChild.nodeValue;
	monoClient = wanStatus[5].firstChild.nodeValue;	
	cooler = wanStatus[6].firstChild.nodeValue;	
	_wlc_state = wanStatus[7].firstChild.nodeValue;	
	_wlc_sbstate = wanStatus[8].firstChild.nodeValue;	

	if(location.pathname == "/QIS_wizard.htm")
		return false;	
	
	// internet
	if(sw_mode == 1){
		if((link_status == "2" && link_auxstatus == "0") || (link_status == "2" && link_auxstatus == "2")){
			$("connect_status").className = "connectstatuson";
			$("connect_status").onclick = function(){openHint(24,3);}
			if(location.pathname == "/" || location.pathname == "/index.asp")
				$("NM_connect_status").innerHTML = "<#Connected#>";
		}
		else{
			$("connect_status").className = "connectstatusoff";
			if(_wlc_sbstate == "wlc_sbstate=2")
				$("connect_status").onclick = function(){openHint(24,3);}
			else
				$("connect_status").onclick = function(){overHint(3);}
			if(location.pathname == "/" || location.pathname == "/index.asp")
			  $("NM_connect_status").innerHTML = "<#Disconnected#>";		 	
		}
		$("connect_status").onmouseover = function(){overHint(3);}
		$("connect_status").onmouseout = function(){nd();}
	}
	else if(sw_mode == 2){
		if(_wlc_state == "wlc_state=2"){
			$("connect_status").className = "connectstatuson";
			$("connect_status").onclick = function(){openHint(24,3);}
			if(location.pathname == "/" || location.pathname == "/index.asp")
				$("NM_connect_status").innerHTML = "<#APSurvey_msg_connected#>";
		}
		else{
			$("connect_status").className = "connectstatusoff";
			if(location.pathname == "/" || location.pathname == "/index.asp")
			  $("NM_connect_status").innerHTML = "<#Disconnected#>";		 	
		}
		$("connect_status").onmouseover = function(){overHint(3);}
		$("connect_status").onmouseout = function(){nd();}
	}

	// usb
	if(usb_support != -1){
		if((current_url=="index.asp"||current_url=="")&&
		   ((usb_path1!=usb_path1_tmp&&usb_path1_tmp!="init")||
		    (usb_path2!=usb_path2_tmp&&usb_path2_tmp!="init")))
			updateUSBStatus();

		if(usb_path1 == "usb=" && usb_path2 == "usb=" || foreign_disk_total_mounted_number()[0] == null){
			$("usb_status").className = "usbstatusoff";
			$("usb_status").onclick = function(){overHint(2);}
			if(printer_support != -1){
				$("printer_status").className = "printstatusoff";
				$("printer_status").onclick = function(){overHint(5);}
				$("printer_status").onmouseover = function(){overHint(5);}
				$("printer_status").onmouseout = function(){nd();}
			}
		}
		else{ // !storage
			if(usb_path1 == "usb=printer" || usb_path2 == "usb=printer"){
				if((current_url == "index.asp" || current_url == "") && $("printerName0") == null && $("printerName1") == null)
					updateUSBStatus();
				if(printer_support != -1){
					$("printer_status").className = "printstatuson";
					$("printer_status").onmouseover = function(){overHint(6);}
					$("printer_status").onmouseout = function(){nd();}
					$("printer_status").onclick = function(){openHint(24,1);}
				}
				if(usb_path1 == "usb=" || usb_path2 == "usb=")
					$("usb_status").className = "usbstatusoff";			
				else
					$("usb_status").className = "usbstatuson";
			}
			else{
				if((current_url == "index.asp" || current_url == "") && ($("printerName0") != null || $("printerName1") != null))
					updateUSBStatus();
				if(printer_support != -1){
					$("printer_status").className = "printstatusoff";
					$("printer_status").onmouseover = function(){overHint(5);}
					$("printer_status").onmouseout = function(){nd();}
				}
				$("usb_status").className = "usbstatuson";
			}
			$("usb_status").onclick = function(){openHint(24,2);}
		}
		$("usb_status").onmouseover = function(){overHint(2);}
		$("usb_status").onmouseout = function(){nd();}
		usb_path1_tmp = usb_path1;
		usb_path2_tmp = usb_path2;
	}

	// guest network
	if(multissid_support != -1 && band5g_support != -1){
		for(var i=0; i<gn_array_2g.length; i++){
			if(gn_array_2g[i][0] == 1 || gn_array_5g[i][0] == 1){
				$("guestnetwork_status").className = "guestnetworkstatuson";
				$("guestnetwork_status").onclick = function(){openHint(24,4);}
				break;
			}
			else{
				$("guestnetwork_status").className = "guestnetworkstatusoff";
				$("guestnetwork_status").onclick = function(){overHint(4);}
			}
		}
		$("guestnetwork_status").onmouseover = function(){overHint(4);}
		$("guestnetwork_status").onmouseout = function(){nd();}
	}
	else if(multissid_support != -1 && band5g_support == -1){
		for(var i=0; i<gn_array_2g.length; i++){
			if(gn_array_2g[i][0] == 1){
				$("guestnetwork_status").className = "guestnetworkstatuson";
				$("guestnetwork_status").onclick = function(){openHint(24,4);}
				break;
			}
			else{
				$("guestnetwork_status").className = "guestnetworkstatusoff";
			}
		}
		$("guestnetwork_status").onmouseover = function(){overHint(4);}
		$("guestnetwork_status").onmouseout = function(){nd();}
	}

	if(cooler_support != -1){
		if(cooler == "cooler=2"){
			$("cooler_status").className = "coolerstatusoff";
			$("cooler_status").onclick = function(){}
		}
		else{
			$("cooler_status").className = "coolerstatuson";
			$("cooler_status").onclick = function(){openHint(24,5);}
		}
		$("cooler_status").onmouseover = function(){overHint(7);}
		$("cooler_status").onmouseout = function(){nd();}
	}

	if(window.frames["statusframe"] && window.frames["statusframe"].stopFlag == 1 || stopFlag == 1) return;
	setTimeout("updateStatus_AJAX();", 3000);
}

function db(obj){
	if(typeof console == 'object')
		console.log(obj);
}

function FormActions(_Action, _ActionMode, _ActionScript, _ActionWait){
	if(_Action != "")
		document.form.action = _Action;
	if(_ActionMode != "")
		document.form.action_mode.value = _ActionMode;
	if(_ActionScript != "")
		document.form.action_script.value = _ActionScript;
	if(_ActionWait != "")
		document.form.action_wait.value = _ActionWait;
}

function change_wl_unit(){
	FormActions("apply.cgi", "change_wl_unit", "", "");
	document.form.target = "";
	document.form.submit();
}

function compareWirelessClient(target1, target2){
	if(target1.length != target2.length)
		return (target2.length-target1.length);
	
	for(var i = 0; i < target1.length; ++i)
		for(var j = 0; j < 3; ++j)
			if(target1[i][j] != target2[i][j])
					return 1;
	
	return 0;
}

function addNewScript(scriptName){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = scriptName;
	document.getElementsByTagName("head")[0].appendChild(script);
}

var cookie_help = {
	set: function(key, value, days) {
		document.cookie = key + '=' + value + '; expires=' +
			(new Date(new Date().getTime() + ((days ? days : 14) * 86400000))).toUTCString() + '; path=/';
	}
};

function getCookie_help(c_name){
	if (document.cookie.length > 0){ 
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		} 
	}
	return null;
}

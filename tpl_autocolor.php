<?php
/**
 * MindTheDark Template autocolor Manager
 *
 * @author   Remo Scheidegger <mindthedark@mailbox.org>
 * @license  GPL 2 (http://www.gnu.org/licenses/gpl.html)
 */
// must be run from within DokuWiki
if (!defined('DOKU_INC')) die();

$selectedTheme = tpl_getConf('theme');
$selectedThemeMode = tpl_getConf('autoDark');
$selectedUserChoice = tpl_getConf('userChoice');

$pluginNote = tpl_getConf('pluginNote');

/*Set Theme Mode*/
if ($selectedThemeMode == '1')
{
    $selectedTheme = 'auto';
}

if ($selectedUserChoice == '0')
{
    echo 'theme="'.$selectedTheme.'"';
}

if ($pluginNote == '1')
{
    echo 'pluginnote="'.$pluginNote.'"';
}
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

/*Set Theme Mode*/
if ($selectedThemeMode == '1')
{
    $selectedTheme = 'auto';
}

?><!DOCTYPE html>

<?php if(tpl_getConf('userChoice') == '0'): ?>
    <html theme="<?php echo $selectedTheme ?>">   
<?php endif ?>

</html>

/**
 * References API and code from https://github.com/niklasvieth/polestar-ios-medium-widget
 */

const DARK_MODE = Device.isUsingDarkAppearance();
const DARK_BG_COLOR = "1C3767";    // WIP - Change to Hyundai blue
const LIGHT_BG_COLOR = "FFFFFF";    // WIP - Change to Hyundai grey from app

const HYUNDAI_ICON_LIGHT = 'https://s2.ezgif.com/tmp/ezgif-2-2f1a85997f.png';
const HYUNDAI_ICON_DARK = 'https://s7.ezgif.com/tmp/ezgif-7-5f8417bed4.png';
const HYUNDAI_IONIQ_5 = 'https://static.tcimg.net/vehicles/primary/c82a51f49a78347c/2024-Hyundai-IONIQ_5-white-full_color-driver_side_front_quarter.png?auto=format&h=450&w=900';

async function loadImage(url) {
    const request = new Request(url);
    return request.loadImage();
}

// WIP - From Polestar Widget, may need to refactor
function getBatteryPercentColor(percent) {
    if (percent > 75) {
        return Color.green();
    } else if (percent > 25) {
        return Color.orange();
    } else {
        return Color.red();
    }
}

// WIP - From Polestar Widget, may need to refactor
function getBatteryIcon(batteryPercent, isConnected, isCharging, isChargingDone) {
    let icon;
    let iconColor;
    if (isCharging || isChargingDone) {
        icon = isCharging
            ? SFSymbol.named("bolt.fill")
            : SFSymbol.named("bolt.badge.checkmark.fill");
        iconColor = Color.green();
    } else if (isConnected) {
        icon = SFSymbol.named("bolt.badge.xmark");
        iconColor = Color.red();
    } else {
        let percentRounded = 0;
        iconColor = Color.red();
        if (batteryPercent > 90) {
            percentRounded = 100;
        } else if (batteryPercent > 60) {
            percentRounded = 75;
        } else if (batteryPercent > 40) {
            percentRounded = 50;
        } else if (batteryPercent > 10) {
            percentRounded = 25;
        }
        iconColor = getBatteryPercentColor(batteryPercent);
        icon = SFSymbol.named(`battery.${ percentRounded }`);
    }
    return { batteryIcon: icon, batteryIconColor: iconColor };
}

// Create Widget
async function createWidget(batteryData, odometerData, vehicleInfo) {
    const BATTERY_PERCENTAGE = 75;
    const ODOMETER_IN_MILES = 5300;
    const IS_CHARGING = false;
    const RANGE_IN_MILES = 180;

    const HYUNDAI_ICON = await loadImage(DARK_MODE ? HYUNDAI_ICON_DARK : HYUNDAI_ICON_LIGHT);
    const VEHICLE_NAME = 'IONIQ 5';

    const WIDGET = new ListWidget();
    WIDGET.url = 'hyundai-usa://';  // WIP - Don't know if this is to open app??
    const MAIN_STACK = WIDGET.addStack();
    MAIN_STACK.layoutVertically();

    // Background Color
    WIDGET.backgroundColor = DARK_MODE ? new Color(DARK_BG_COLOR) : new Color(LIGHT_BG_COLOR);

    // Top Row - Vehicle Name & Hyundai Icon
    MAIN_STACK.addSpacer();
    const TITLE_STACK = MAIN_STACK.addStack();
    const TITLE_ELEMENT = TITLE_STACK.addText(VEHICLE_NAME);
    TITLE_ELEMENT.textColor = DARK_MODE ? Color.white() : Color.black();
    TITLE_ELEMENT.textOpacity = 0.7;
    TITLE_ELEMENT.font = Font.mediumSystemFont(18);
    TITLE_STACK.addSpacer();
    const ICON_ELEMENT = TITLE_STACK.addImage(HYUNDAI_ICON);
    ICON_ELEMENT.imageSize = new Size(30, 30);
    MAIN_STACK.addSpacer();

    // Center Row
    const CONTENT_STACK = MAIN_STACK.addStack();
    // Vehicle Image
    const CAR_IMAGE = await loadImage(HYUNDAI_IONIQ_5);
    const CAR_IMAGE_ELEMENT = CONTENT_STACK.addImage(CAR_IMAGE);
    CAR_IMAGE_ELEMENT.imageSize = new Size(150, 90);
    CONTENT_STACK.addSpacer();
    // Battery Stack
    const BATTERY_INFO_STACK = CONTENT_STACK.addStack();
    BATTERY_INFO_STACK.layoutVertically();
    BATTERY_INFO_STACK.addSpacer();
    // Range
    const RANGE_STACK = BATTERY_INFO_STACK.addStack();
    RANGE_STACK.addSpacer();
    const RANGE_TEXT = `${ RANGE_IN_MILES } mi`;
    const RANGE_ELEMENT = RANGE_STACK.addText(RANGE_TEXT);
    RANGE_ELEMENT.font = Font.mediumSystemFont(20);
    RANGE_ELEMENT.textColor = DARK_MODE ? Color.white() : Color.black();
    RANGE_ELEMENT.rightAlignText();
    BATTERY_INFO_STACK.addSpacer();
    // Battery Percent
    const BATTERY_PERCENTAGE_STACK = BATTERY_INFO_STACK.addStack();
    BATTERY_PERCENTAGE_STACK.addSpacer();
    BATTERY_PERCENTAGE_STACK.centerAlignContent();
    const { BATTERY_ICON, BATTERY_ICON_COLOUR } = getBatteryIcon(BATTERY_PERCENTAGE, false, IS_CHARGING, false);
    // const BATTERY_SYMBOL_ELEMENT = BATTERY_PERCENTAGE_STACK.addImage(BATTERY_ICON.image);
    const BATTERY_SYMBOL_ELEMENT = BATTERY_PERCENTAGE_STACK.addImage(SFSymbol.named(`battery.75`).image);
    BATTERY_SYMBOL_ELEMENT.imageSize = new Size(25, 25);
    BATTERY_SYMBOL_ELEMENT.tintColor = BATTERY_ICON_COLOUR;
    BATTERY_PERCENTAGE_STACK.addSpacer(8);
    // Battery Text
    const BATTERY_PERCENTAGE_TEXT = BATTERY_PERCENTAGE_STACK.addText(`${ BATTERY_PERCENTAGE }%`);
    BATTERY_PERCENTAGE_TEXT.textColor = getBatteryPercentColor(BATTERY_PERCENTAGE);
    BATTERY_PERCENTAGE_TEXT.font = Font.boldSystemFont(20);
    // Charging State (? Maybe remove ?)
    BATTERY_INFO_STACK.addSpacer();

    // Footer
    const FOOTER_STACK = MAIN_STACK.addStack();
    // Odometer
    const ODOMETER_TEXT = `${ ODOMETER_IN_MILES.toLocaleString() } mi`;
    const ODOMETER_ELEMENT = FOOTER_STACK.addText(ODOMETER_TEXT);
    ODOMETER_ELEMENT.font = Font.mediumSystemFont(10);
    ODOMETER_ELEMENT.textColor = DARK_MODE ? Color.white() : Color.black();
    ODOMETER_ELEMENT.textOpacity = 0.5;
    ODOMETER_ELEMENT.minimumScaleFactor = 0.5;
    ODOMETER_ELEMENT.leftAlignText();
    FOOTER_STACK.addSpacer();
    // Last Active Time

    return WIDGET;
}

// Setup Widget
const WIDGET = await createWidget(null, null, null);
if (config.runsInWidget) {
    Script.setWidget(WIDGET);
} else {
    WIDGET.presentMedium();
}

Script.complete();
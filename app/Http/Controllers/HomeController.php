<?php

namespace App\Http\Controllers;

use App\Enums\BlockCategoryEnum;
use App\Enums\MenuCategoryEnum;
use App\Facades\SettingService\LanguageService;
use App\Facades\WebsiteService\BlockService;
use App\Facades\WebsiteService\MenuService;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;

//use App\Facades\Blocks\BlockCategoryService;
//use App\Facades\Blocks\BlockService;
//use App\Facades\Languages\LanguageService;
//use App\Facades\Settings\SettingService;
//use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index() {

        $mainLinks = MenuService::getActiveLinks(Str::slug(MenuCategoryEnum::MAIN_MENU->value, '-'));
        $socialLinks = MenuService::getActiveLinks(Str::slug(MenuCategoryEnum::SOCIAL_MENU->value, '-'));
        $contactLinks = MenuService::getActiveLinks(Str::slug(MenuCategoryEnum::CONTACT_MENU->value, '-'));
        $footerLinks = MenuService::getActiveLinks(Str::slug(MenuCategoryEnum::FOOTER_MENU->value, '-'));

        $logo = 'logo.png';
        $languages = LanguageService::getActiveLanguages();
//        $homeSlider = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::MAIN_SECTION->value, '-'));
//        $services = BlockService::getActiveBlocks(BlockCategoryEnum::SERVICES);
//        $clients = BlockService::getActiveBlocks(BlockCategoryEnum::CLIENTS);
//        $galleries = BlockService::getActiveBlocks(BlockCategoryEnum::GALLERY);
//        $missions = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::MISSION->value));
//        $about = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::ABOUT->value));
//        $news = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::NEWS->value));
//        $articles = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::ARTICLES->value));
//        $industries = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::INDUSTRIES->value));
        return Inertia::render('Site/Home', [
            'mainLinks' => $mainLinks,
            'socialLinks' => $socialLinks,
            'footerLinks' => $footerLinks,
            'contactLinks' => $contactLinks,
            'logo' => $logo,
            'languages' => $languages,
//            'mainSliders' => $homeSlider,
//            'services' => $services,
//            'clients' => $clients,
//            'galleries' => $galleries,
//            'missions' => $missions,
//            'about' => $about,
//            'news' => $news,
//            'articles' => $articles,
//            'industries' => $industries,
        ]);
    }
}

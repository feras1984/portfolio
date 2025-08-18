<?php

namespace  App\Http\Middleware;

use App\Facades\SettingService\LanguageService;
use App\Facades\UserService\UserService;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = is_null($request->user()) ? null : UserService::mapUserModel($request->user());
        $languages = LanguageService::getLanguages();
        return [
            ...parent::share($request),
            'settings' => [
                'languages' => $languages,
            ],
            'auth' => [
                'user' => $user,
            ],
//            'ziggy' => fn () => [
//                ...(new Ziggy)->toArray(),
//                'location' => $request->url(),
//            ],
        ];
    }
}

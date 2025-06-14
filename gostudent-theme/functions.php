<?php
function mytheme_enqueue_scripts() {
    $dist_path = get_template_directory_uri() . '/dist';

    // CSS
    wp_enqueue_style('mytheme-style', $dist_path . '/assets/index-DDA4tX3L.css', [], null);
    wp_enqueue_style('mytheme-style', $dist_path . '/assets/a.css', [], null);

    // JS as module
    wp_enqueue_script('mytheme-script', $dist_path . '/assets/index-D6aHBWEk.js', [], null, true);

    add_filter('script_loader_tag', function($tag, $handle, $src) {
        if ($handle === 'mytheme-script') {
            return '<script type="module" src="' . esc_url($src) . '"></script>';
        }
        return $tag;
    }, 10, 3);
}
add_action('wp_enqueue_scripts', 'mytheme_enqueue_scripts');
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/submit', [
        'methods'  => 'POST',
        'callback' => 'handle_custom_form',
        'permission_callback' => '__return_true', 
    ]);
});

function handle_custom_form($request) {
    $params = $request->get_json_params();

    error_log(print_r($params, true));

    return new WP_REST_Response([
        'success' => true,
        'received' => $params,
        'message' => 'تم استلام البيانات بنجاح'
    ], 200);
}

.class La/c/a/d;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/c/a/h;


# direct methods
.method constructor <init>()V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method

.method private j(La/c/a/g;)La/c/a/i;
    .locals 0

    invoke-interface {p1}, La/c/a/g;->c()Landroid/graphics/drawable/Drawable;

    move-result-object p1

    check-cast p1, La/c/a/i;

    return-object p1
.end method


# virtual methods
.method public a(La/c/a/g;)F
    .locals 0

    invoke-interface {p1}, La/c/a/g;->d()Landroid/view/View;

    move-result-object p1

    invoke-virtual {p1}, Landroid/view/View;->getElevation()F

    move-result p1

    return p1
.end method

.method public a()V
    .locals 0

    return-void
.end method

.method public a(La/c/a/g;F)V
    .locals 0

    invoke-direct {p0, p1}, La/c/a/d;->j(La/c/a/g;)La/c/a/i;

    move-result-object p1

    invoke-virtual {p1, p2}, La/c/a/i;->a(F)V

    return-void
.end method

.method public a(La/c/a/g;Landroid/content/res/ColorStateList;)V
    .locals 0

    invoke-direct {p0, p1}, La/c/a/d;->j(La/c/a/g;)La/c/a/i;

    move-result-object p1

    invoke-virtual {p1, p2}, La/c/a/i;->a(Landroid/content/res/ColorStateList;)V

    return-void
.end method

.method public b(La/c/a/g;)F
    .locals 0

    invoke-direct {p0, p1}, La/c/a/d;->j(La/c/a/g;)La/c/a/i;

    move-result-object p1

    invoke-virtual {p1}, La/c/a/i;->c()F

    move-result p1

    return p1
.end method

.method public b(La/c/a/g;F)V
    .locals 0

    invoke-interface {p1}, La/c/a/g;->d()Landroid/view/View;

    move-result-object p1

    invoke-virtual {p1, p2}, Landroid/view/View;->setElevation(F)V

    return-void
.end method

.method public c(La/c/a/g;)V
    .locals 1

    invoke-virtual {p0, p1}, La/c/a/d;->d(La/c/a/g;)F

    move-result v0

    invoke-virtual {p0, p1, v0}, La/c/a/d;->c(La/c/a/g;F)V

    return-void
.end method

.method public c(La/c/a/g;F)V
    .locals 3

    invoke-direct {p0, p1}, La/c/a/d;->j(La/c/a/g;)La/c/a/i;

    move-result-object v0

    invoke-interface {p1}, La/c/a/g;->b()Z

    move-result v1

    invoke-interface {p1}, La/c/a/g;->a()Z

    move-result v2

    invoke-virtual {v0, p2, v1, v2}, La/c/a/i;->a(FZZ)V

    invoke-virtual {p0, p1}, La/c/a/d;->i(La/c/a/g;)V

    return-void
.end method

.method public d(La/c/a/g;)F
    .locals 0

    invoke-direct {p0, p1}, La/c/a/d;->j(La/c/a/g;)La/c/a/i;

    move-result-object p1

    invoke-virtual {p1}, La/c/a/i;->b()F

    move-result p1

    return p1
.end method

.method public e(La/c/a/g;)Landroid/content/res/ColorStateList;
    .locals 0

    invoke-direct {p0, p1}, La/c/a/d;->j(La/c/a/g;)La/c/a/i;

    move-result-object p1

    invoke-virtual {p1}, La/c/a/i;->a()Landroid/content/res/ColorStateList;

    move-result-object p1

    return-object p1
.end method

.method public f(La/c/a/g;)F
    .locals 1

    invoke-virtual {p0, p1}, La/c/a/d;->b(La/c/a/g;)F

    move-result p1

    const/high16 v0, 0x40000000    # 2.0f

    mul-float/2addr p1, v0

    return p1
.end method

.method public g(La/c/a/g;)F
    .locals 1

    invoke-virtual {p0, p1}, La/c/a/d;->b(La/c/a/g;)F

    move-result p1

    const/high16 v0, 0x40000000    # 2.0f

    mul-float/2addr p1, v0

    return p1
.end method

.method public h(La/c/a/g;)V
    .locals 1

    invoke-virtual {p0, p1}, La/c/a/d;->d(La/c/a/g;)F

    move-result v0

    invoke-virtual {p0, p1, v0}, La/c/a/d;->c(La/c/a/g;F)V

    return-void
.end method

.method public i(La/c/a/g;)V
    .locals 4

    invoke-interface {p1}, La/c/a/g;->b()Z

    move-result v0

    if-nez v0, :cond_0

    const/4 v0, 0x0

    invoke-interface {p1, v0, v0, v0, v0}, La/c/a/g;->a(IIII)V

    return-void

    :cond_0
    invoke-virtual {p0, p1}, La/c/a/d;->d(La/c/a/g;)F

    move-result v0

    invoke-virtual {p0, p1}, La/c/a/d;->b(La/c/a/g;)F

    move-result v1

    invoke-interface {p1}, La/c/a/g;->a()Z

    move-result v2

    invoke-static {v0, v1, v2}, La/c/a/j;->a(FFZ)F

    move-result v2

    float-to-double v2, v2

    invoke-static {v2, v3}, Ljava/lang/Math;->ceil(D)D

    move-result-wide v2

    double-to-int v2, v2

    invoke-interface {p1}, La/c/a/g;->a()Z

    move-result v3

    invoke-static {v0, v1, v3}, La/c/a/j;->b(FFZ)F

    move-result v0

    float-to-double v0, v0

    invoke-static {v0, v1}, Ljava/lang/Math;->ceil(D)D

    move-result-wide v0

    double-to-int v0, v0

    invoke-interface {p1, v2, v0, v2, v0}, La/c/a/g;->a(IIII)V

    return-void
.end method

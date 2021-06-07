.class La/c/a/f;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/c/a/h;


# instance fields
.field final a:Landroid/graphics/RectF;


# direct methods
.method constructor <init>()V
    .locals 1

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    new-instance v0, Landroid/graphics/RectF;

    invoke-direct {v0}, Landroid/graphics/RectF;-><init>()V

    iput-object v0, p0, La/c/a/f;->a:Landroid/graphics/RectF;

    return-void
.end method

.method private j(La/c/a/g;)La/c/a/j;
    .locals 0

    invoke-interface {p1}, La/c/a/g;->c()Landroid/graphics/drawable/Drawable;

    move-result-object p1

    check-cast p1, La/c/a/j;

    return-object p1
.end method


# virtual methods
.method public a(La/c/a/g;)F
    .locals 0

    invoke-direct {p0, p1}, La/c/a/f;->j(La/c/a/g;)La/c/a/j;

    move-result-object p1

    invoke-virtual {p1}, La/c/a/j;->f()F

    move-result p1

    return p1
.end method

.method public a()V
    .locals 1

    new-instance v0, La/c/a/e;

    invoke-direct {v0, p0}, La/c/a/e;-><init>(La/c/a/f;)V

    sput-object v0, La/c/a/j;->b:La/c/a/j$a;

    return-void
.end method

.method public a(La/c/a/g;F)V
    .locals 1

    invoke-direct {p0, p1}, La/c/a/f;->j(La/c/a/g;)La/c/a/j;

    move-result-object v0

    invoke-virtual {v0, p2}, La/c/a/j;->a(F)V

    invoke-virtual {p0, p1}, La/c/a/f;->i(La/c/a/g;)V

    return-void
.end method

.method public a(La/c/a/g;Landroid/content/res/ColorStateList;)V
    .locals 0

    invoke-direct {p0, p1}, La/c/a/f;->j(La/c/a/g;)La/c/a/j;

    move-result-object p1

    invoke-virtual {p1, p2}, La/c/a/j;->a(Landroid/content/res/ColorStateList;)V

    return-void
.end method

.method public b(La/c/a/g;)F
    .locals 0

    invoke-direct {p0, p1}, La/c/a/f;->j(La/c/a/g;)La/c/a/j;

    move-result-object p1

    invoke-virtual {p1}, La/c/a/j;->b()F

    move-result p1

    return p1
.end method

.method public b(La/c/a/g;F)V
    .locals 0

    invoke-direct {p0, p1}, La/c/a/f;->j(La/c/a/g;)La/c/a/j;

    move-result-object p1

    invoke-virtual {p1, p2}, La/c/a/j;->c(F)V

    return-void
.end method

.method public c(La/c/a/g;)V
    .locals 0

    return-void
.end method

.method public c(La/c/a/g;F)V
    .locals 1

    invoke-direct {p0, p1}, La/c/a/f;->j(La/c/a/g;)La/c/a/j;

    move-result-object v0

    invoke-virtual {v0, p2}, La/c/a/j;->b(F)V

    invoke-virtual {p0, p1}, La/c/a/f;->i(La/c/a/g;)V

    return-void
.end method

.method public d(La/c/a/g;)F
    .locals 0

    invoke-direct {p0, p1}, La/c/a/f;->j(La/c/a/g;)La/c/a/j;

    move-result-object p1

    invoke-virtual {p1}, La/c/a/j;->c()F

    move-result p1

    return p1
.end method

.method public e(La/c/a/g;)Landroid/content/res/ColorStateList;
    .locals 0

    invoke-direct {p0, p1}, La/c/a/f;->j(La/c/a/g;)La/c/a/j;

    move-result-object p1

    invoke-virtual {p1}, La/c/a/j;->a()Landroid/content/res/ColorStateList;

    move-result-object p1

    return-object p1
.end method

.method public f(La/c/a/g;)F
    .locals 0

    invoke-direct {p0, p1}, La/c/a/f;->j(La/c/a/g;)La/c/a/j;

    move-result-object p1

    invoke-virtual {p1}, La/c/a/j;->d()F

    move-result p1

    return p1
.end method

.method public g(La/c/a/g;)F
    .locals 0

    invoke-direct {p0, p1}, La/c/a/f;->j(La/c/a/g;)La/c/a/j;

    move-result-object p1

    invoke-virtual {p1}, La/c/a/j;->e()F

    move-result p1

    return p1
.end method

.method public h(La/c/a/g;)V
    .locals 2

    invoke-direct {p0, p1}, La/c/a/f;->j(La/c/a/g;)La/c/a/j;

    move-result-object v0

    invoke-interface {p1}, La/c/a/g;->a()Z

    move-result v1

    invoke-virtual {v0, v1}, La/c/a/j;->a(Z)V

    invoke-virtual {p0, p1}, La/c/a/f;->i(La/c/a/g;)V

    return-void
.end method

.method public i(La/c/a/g;)V
    .locals 4

    new-instance v0, Landroid/graphics/Rect;

    invoke-direct {v0}, Landroid/graphics/Rect;-><init>()V

    invoke-direct {p0, p1}, La/c/a/f;->j(La/c/a/g;)La/c/a/j;

    move-result-object v1

    invoke-virtual {v1, v0}, La/c/a/j;->a(Landroid/graphics/Rect;)V

    invoke-virtual {p0, p1}, La/c/a/f;->g(La/c/a/g;)F

    move-result v1

    float-to-double v1, v1

    invoke-static {v1, v2}, Ljava/lang/Math;->ceil(D)D

    move-result-wide v1

    double-to-int v1, v1

    invoke-virtual {p0, p1}, La/c/a/f;->f(La/c/a/g;)F

    move-result v2

    float-to-double v2, v2

    invoke-static {v2, v3}, Ljava/lang/Math;->ceil(D)D

    move-result-wide v2

    double-to-int v2, v2

    invoke-interface {p1, v1, v2}, La/c/a/g;->a(II)V

    iget v1, v0, Landroid/graphics/Rect;->left:I

    iget v2, v0, Landroid/graphics/Rect;->top:I

    iget v3, v0, Landroid/graphics/Rect;->right:I

    iget v0, v0, Landroid/graphics/Rect;->bottom:I

    invoke-interface {p1, v1, v2, v3, v0}, La/c/a/g;->a(IIII)V

    return-void
.end method

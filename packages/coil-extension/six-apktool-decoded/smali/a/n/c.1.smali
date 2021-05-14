.class La/n/c;
.super Landroid/animation/AnimatorListenerAdapter;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/n/m;->a(Landroid/view/ViewGroup;La/n/M;La/n/M;)Landroid/animation/Animator;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroid/view/ViewGroup;

.field final synthetic b:Landroid/graphics/drawable/BitmapDrawable;

.field final synthetic c:Landroid/view/View;

.field final synthetic d:F

.field final synthetic e:La/n/m;


# direct methods
.method constructor <init>(La/n/m;Landroid/view/ViewGroup;Landroid/graphics/drawable/BitmapDrawable;Landroid/view/View;F)V
    .locals 0

    iput-object p1, p0, La/n/c;->e:La/n/m;

    iput-object p2, p0, La/n/c;->a:Landroid/view/ViewGroup;

    iput-object p3, p0, La/n/c;->b:Landroid/graphics/drawable/BitmapDrawable;

    iput-object p4, p0, La/n/c;->c:Landroid/view/View;

    iput p5, p0, La/n/c;->d:F

    invoke-direct {p0}, Landroid/animation/AnimatorListenerAdapter;-><init>()V

    return-void
.end method


# virtual methods
.method public onAnimationEnd(Landroid/animation/Animator;)V
    .locals 1

    iget-object p1, p0, La/n/c;->a:Landroid/view/ViewGroup;

    invoke-static {p1}, La/n/ba;->b(Landroid/view/View;)La/n/Y;

    move-result-object p1

    iget-object v0, p0, La/n/c;->b:Landroid/graphics/drawable/BitmapDrawable;

    invoke-interface {p1, v0}, La/n/Y;->b(Landroid/graphics/drawable/Drawable;)V

    iget-object p1, p0, La/n/c;->c:Landroid/view/View;

    iget v0, p0, La/n/c;->d:F

    invoke-static {p1, v0}, La/n/ba;->a(Landroid/view/View;F)V

    return-void
.end method

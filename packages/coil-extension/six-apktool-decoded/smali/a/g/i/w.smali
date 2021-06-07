.class La/g/i/w;
.super Landroid/animation/AnimatorListenerAdapter;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/g/i/y;->a(Landroid/view/View;La/g/i/z;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/g/i/z;

.field final synthetic b:Landroid/view/View;

.field final synthetic c:La/g/i/y;


# direct methods
.method constructor <init>(La/g/i/y;La/g/i/z;Landroid/view/View;)V
    .locals 0

    iput-object p1, p0, La/g/i/w;->c:La/g/i/y;

    iput-object p2, p0, La/g/i/w;->a:La/g/i/z;

    iput-object p3, p0, La/g/i/w;->b:Landroid/view/View;

    invoke-direct {p0}, Landroid/animation/AnimatorListenerAdapter;-><init>()V

    return-void
.end method


# virtual methods
.method public onAnimationCancel(Landroid/animation/Animator;)V
    .locals 1

    iget-object p1, p0, La/g/i/w;->a:La/g/i/z;

    iget-object v0, p0, La/g/i/w;->b:Landroid/view/View;

    invoke-interface {p1, v0}, La/g/i/z;->a(Landroid/view/View;)V

    return-void
.end method

.method public onAnimationEnd(Landroid/animation/Animator;)V
    .locals 1

    iget-object p1, p0, La/g/i/w;->a:La/g/i/z;

    iget-object v0, p0, La/g/i/w;->b:Landroid/view/View;

    invoke-interface {p1, v0}, La/g/i/z;->b(Landroid/view/View;)V

    return-void
.end method

.method public onAnimationStart(Landroid/animation/Animator;)V
    .locals 1

    iget-object p1, p0, La/g/i/w;->a:La/g/i/z;

    iget-object v0, p0, La/g/i/w;->b:Landroid/view/View;

    invoke-interface {p1, v0}, La/g/i/z;->c(Landroid/view/View;)V

    return-void
.end method
